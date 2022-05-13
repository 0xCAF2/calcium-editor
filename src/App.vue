<template>
  <v-app>
    <v-app-bar app :color="running ? 'orange' : 'blue'">
      <div class="d-flex align-center">
        <v-switch
          style="width: 200px"
          v-model="running"
          color="white"
          hide-details="auto"
        >
          <template #label>
            <span class="text-white py-3"
              ><b>{{ labelForRun }}</b></span
            >
          </template>
        </v-switch>
        <v-progress-circular
          v-show="running"
          color="white"
          :indeterminate="waiting"
          class="mr-2"
        ></v-progress-circular>
        <v-btn color="white" @click="save">
          <v-icon dark x-large>mdi-download</v-icon>
          <span>{{ labelForSave }}</span>
        </v-btn>
        <v-btn color="white" @click="open">
          <v-icon dark x-large>mdi-file-document-outline</v-icon>
          <span>{{ labelForOpen }}</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="mx-0">
        <v-row>
          <v-col class="pa-0" cols="12">
            <div ref="div-workspace"></div>
          </v-col>
        </v-row>
      </v-container>
      <textarea id="output" v-show="running" readonly>{{ output }}</textarea>
      <textarea id="error" v-show="error" readonly>{{ error }}</textarea>
    </v-main>
  </v-app>
</template>

<script lang>
import * as Blockly from 'blockly/core'
import * as Lang from 'blockly/msg/en'
import './en'
import DarkTheme from '@blockly/theme-dark'
import definition from './definition_en'
import generator from './generator'
import { defineComponent } from 'vue'

Blockly.setLocale(Lang)

let workspace = null

export default defineComponent({
  name: 'App',
  data: () => ({
    debuggerEnabled: false,
    error: '',
    output: '',
    running: false,
    waiting: false,
  }),
  computed: {
    labelForOpen: () => Blockly.Msg.CALCIUM_UI_OPEN,
    labelForRun: () => Blockly.Msg.CALCIUM_UI_RUN,
    labelForSave: () => Blockly.Msg.CALCIUM_UI_SAVE,
  },
  methods: {
    cancel() {
      this.worker?.terminate()
      this.worker = null
    },
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
    resize() {
      const divWorkspace = this.$refs['div-workspace']
      divWorkspace.style.height = window.innerHeight - 80 + 'px'
      divWorkspace.style.width = window.innerWidth - 8 + 'px'
      Blockly.svgResize(workspace)
    },
    run() {
      this.cancel()
      this.worker = new Worker('/script/worker.js')
      this.worker.onmessage = (event) => {
        const message = event.data
        if (message.startsWith('loaded#')) {
          this.waiting = false
          this.worker.postMessage(code)
        } else if (message.startsWith('output#')) {
          this.output += message.substring(7)
          this.output += '\n'
        } else if (message.startsWith('error#')) {
          this.error += message.substring(6)
          this.error += '\n'
        }
      }
      const jsonCode = generator.workspaceToCode(workspace)
      const code = `runtime = Runtime('${jsonCode
        .replace(/\n/g, '')
        .replace(/'/g, "\\'")}')
runtime.run()
print()
`
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
  },
  mounted() {
    workspace = Blockly.inject(this.$refs['div-workspace'], {
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
        contents: definition,
      },
    })
    this.resize()
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault()
      e.returnValue = 'c'
    })
  },
  watch: {
    running(newValue) {
      this.waiting = newValue
      if (newValue) {
        this.output = ''
        this.run()
      }
      this.error = ''
    },
  },
})
</script>
<style scoped>
#output {
  color: black;
  background-color: white;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Mono',
    Consolas, monospace;
  width: 400px;
  min-height: 200px;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1000;
}
#error {
  color: red;
  background-color: white;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Mono',
    Consolas, monospace;
  font-size: small;
  width: 400px;
  max-height: 200px;
  min-height: 200px;
  height: 200px;
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 2000;
  resize: none;
}
</style>
