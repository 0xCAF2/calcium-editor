<template>
  <v-app>
    <v-app-bar app :color="running ? 'orange' : 'blue'" style="z-index: 3000">
      <div class="d-flex align-center">
        <v-switch style="width: 100px; margin-left: 10px" v-model="running" hide-details="auto" :disabled="waiting">
          <template #label>
            <span class="py-3"><b>{{ labelForRun }}</b></span>
          </template>
        </v-switch>
        <v-btn @click="save" size="large">
          <span>{{ labelForSave }}</span>
        </v-btn>
        <v-btn @click="open" size="large">
          <span>{{ labelForOpen }}</span>
        </v-btn>
        <v-progress-circular :indeterminate="waiting" v-show="waiting"></v-progress-circular>
        <v-menu bottom>
          <template #activator="{ props }">
            <v-btn v-bind="props" v-show="running">
              <span><b>...</b></span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="resetRuntime">
              <v-list-item-title>{{ labelForReset }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="mx-0">
        <v-row>
          <v-col class="pa-0" cols="12">
            <div id="div-blockly"></div>
          </v-col>
        </v-row>
      </v-container>
      <div id="output">
        <textarea v-show="running" readonly>{{ output }}</textarea>
        <div class="white-background">
          <div id="div-code" v-show="running"></div>
        </div>
        <textarea id="error" v-show="error" readonly>{{ error }}</textarea>
      </div>
      <v-overlay v-model="overlayed" z-index="2000" absolute>
        <v-container>
          <v-row style="height: 100px"></v-row>
          <v-row justify="center" align="center">
            <v-col cols="8">
              <input style="
                             background-color: white;
                             color: black;
                             width: 400px;
                             max-width: 95%;
                             " :placeholder="prompt" v-model="input" />
            </v-col>
            <v-col cols="4">
              <v-btn @click="sendInput">OK</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
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
import { defineComponent } from 'vue'

Blockly.setLocale(Lang)

let workspace = null

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
      const generator = new CalciumGenerator('calcium')
      const jsonCode = generator.workspaceToCode(workspace)
      this.code = jsonCode
      console.log(jsonCode)
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
  color: black;
  position: absolute;
  top: 72px;
  right: 4px;
  z-index: 1000;
}

#error {
  color: red;
  font-size: small;
  margin-top: 4px;
}

textarea {
  background-color: white;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Mono',
    Consolas, monospace;
  width: 380px;
  max-width: 95%;
}

div.white-background {
  background-color: white;
}
</style>
