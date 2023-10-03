<template>
  <v-app>
    <v-app-bar app :color="running ? 'orange' : 'blue'" style="z-index: 3000">
      <template v-slot:prepend>
        <v-switch style="margin-left: 10px" v-model="running" hide-details="auto" :disabled="waiting">
          <template #label>
            <span><b>{{ labelForRun }}</b></span>
          </template>
        </v-switch>
      </template>
      <v-app-bar-title>
        <v-btn @click="save" size="large">
          <span>{{ labelForSave }}</span>
        </v-btn>
        <v-btn @click="open" size="large" :disabled="running">
          <span>{{ labelForOpen }}</span>
        </v-btn>
        <v-progress-circular :indeterminate="waiting" v-show="waiting"></v-progress-circular>
        <v-menu bottom>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" v-show="running" small>
              <span><b>...</b></span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="resetRuntime">
              <v-list-item-title>{{ labelForReset }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn icon href="https://calcium.0xcaf2.dev" target="_blank">
          <span><b>？</b></span>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="mx-0">
        <v-row>
          <v-col class="pa-0" cols="12">
            <div id="div-blockly"></div>
          </v-col>
        </v-row>
      </v-container>
      <v-container id="output" v-if="running">
        <v-row>
          <v-textarea v-show="error" variant="outlined" bg-color="white" v-model="error" base-color="red" color="red"
            readonly></v-textarea>
        </v-row>
        <v-row>
          <v-textarea v-show="running" variant="solo-filled" bg-color="white" v-model="output" readonly></v-textarea>
        </v-row>
        <v-row>
          <v-textarea v-show="running" variant="outlined" bg-color="white" v-model="pseudoCode" base-color="blue"
            color="blue" readonly auto-grow></v-textarea>
        </v-row>
      </v-container>
      <v-dialog v-model="overlayed" id="dialog">
        <v-text-field base-color="white" bg-color="white" color="black" variant="solo-filled" autofocus :label="prompt"
          v-model="input" />
        <v-btn @click="sendInput" color="blue">OK</v-btn>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import * as Blockly from 'blockly/core'
import * as Lang from 'blockly/msg/ja'
import './ja'
import DarkTheme from '@blockly/theme-dark'
// import definition from './definition_ja'
import { calciumBlocks } from './blocks'
import { calciumToolbox } from './toolbox'
// import generator from './generator'
import { CalciumGenerator } from './calcium-generator'
import { PseudoGenerator } from './pseudo-generator'
import { defineComponent } from 'vue'

Blockly.setLocale(Lang)

let workspace = null
const pseudoGenerator = new PseudoGenerator('pseudo')
const calciumGenerator = new CalciumGenerator('calcium')

export default defineComponent({
  name: 'App',
  data: () => ({
    debuggerEnabled: false,
    code: '',
    error: '',
    input: '',
    inputting: false,
    output: '',
    overlayed: false,
    pseudoCode: '',
    prompt: '',
    running: false,
    waiting: true,
  }),
  computed: {
    labelForOpen: () => Blockly.Msg.CALCIUM_UI_OPEN,
    labelForReset: () => Blockly.Msg.CALCIUM_UI_RESET,
    labelForRun: () => Blockly.Msg.CALCIUM_UI_RUN,
    labelForSave: () => Blockly.Msg.CALCIUM_UI_SAVE,
  },
  methods: {
    open() {
      const inputFile = document.createElement('input')
      inputFile.type = 'file'
      inputFile.addEventListener('change', () => {
        const file = inputFile.files?.[0]
        if (!file) return
        if (file.type !== 'application/json') {
          alert('ファイルを開くことができませんでした')
          return
        }
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          const json = reader.result
          if (typeof json === 'string') {
            Blockly.serialization.workspaces.load(JSON.parse(json), workspace)
          }
        })
        reader.readAsText(file)
      })
      inputFile.click()
    },
    resetRuntime() {
      this.worker?.terminate()
      this.worker = null
      this.running = false
      this.waiting = true
      this.worker = new Worker('/script/worker.js')
      this.worker.onmessage = (event) => {
        const message = event.data
        if (message.loaded) {
          this.waiting = false
        } else if (message.output || message.output === '') {
          this.output += message.output
          this.output += '\n'
        } else if (message.error) {
          this.error += message.error
          this.error += '\n'
        } else if (message.input || message.input === '') {
          this.input = ''
          this.prompt = message.input
          this.inputting = true
          this.overlayed = true
        }
      }
    },
    resize() {
      const divBlockly = document.querySelector('#div-blockly')
      divBlockly.style.height = window.innerHeight - 80 + 'px'
      divBlockly.style.width = window.innerWidth - 8 + 'px'
      Blockly.svgResize(workspace)
    },
    run() {
      const pseudoCode = pseudoGenerator.workspaceToCode(workspace)
      this.pseudoCode = pseudoCode

      const jsonCode = calciumGenerator.workspaceToCode(workspace)
      this.code = jsonCode
      const code = `runtime = Runtime('${jsonCode
        .replace(/\n/g, '')
        .replace(/'/g, "\\'")}')
result = runtime.run()
print(end='', flush=True)
result
`
      this.worker.postMessage({ code })
    },
    save() {
      const json = Blockly.serialization.workspaces.save(workspace)
      const a = document.createElement('a')
      a.href =
        'data:application/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(json))
      a.download = 'code.json'
      a.click()
    },
    sendInput() {
      this.inputting = false
      this.overlayed = false
      this.worker.postMessage({
        input: this.input.replace(/\n/g, '').replace(/'/g, "\\'"),
      })
    },
  },
  mounted() {
    Blockly.common.defineBlocks(calciumBlocks)
    workspace = Blockly.inject(document.querySelector('#div-blockly'), {
      move: {
        scrollbars: true,
        drag: true,
        wheel: false,
      },
      zoom: {
        controls: true,
        startScale: 0.7,
      },
      renderer: 'zelos',
      sounds: false,
      theme: DarkTheme,
      toolbox: {
        kind: 'categoryToolbox',
        contents: calciumToolbox,
      },
    })
    this.resize()
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault()
      e.returnValue = 'c'
    })
    this.resetRuntime()
  },
  watch: {
    running(newValue) {
      if (newValue) {
        this.output = ''
        this.run()
      } else {
        this.inputting = false
      }
      this.error = ''
    },
    overlayed(newValue) {
      if (this.inputting) {
        this.overlayed = true
      } else {
        this.overlayed = newValue
      }
    },
  },
})
</script>
<style scoped>
#output {
  position: absolute;
  top: 72px;
  right: 4px;
  z-index: 1000;
  width: 480px;
  max-width: 95%;
}

.v-textarea {
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Mono',
    Consolas, monospace;
}

#dialog {
  max-width: 640px;
}
</style>
