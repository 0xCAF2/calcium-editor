<script setup lang="ts">
import * as Blockly from 'blockly/core'
import * as Lang from 'blockly/msg/ja'
import './ja'
import DarkTheme from '@blockly/theme-dark'
import { calciumBlocks } from './blocks'
import { calciumToolbox } from './toolbox'
import { CalciumGenerator } from './calcium-generator'
import { PseudoGenerator } from './pseudo-generator'
import { onMounted, ref, watch } from 'vue'
import './renderer'

Blockly.setLocale(Lang)

let workspace: Blockly.WorkspaceSvg | null = null
let worker: Worker | null = null
const pseudoGenerator = new PseudoGenerator('pseudo')
const calciumGenerator = new CalciumGenerator('calcium')

const code = ref('')
const error = ref('')
const input = ref('')
const inputting = ref(false)
const output = ref('')
const overlayed = ref(false)
const pseudoCode = ref('')
const prompt = ref('')
const running = ref(false)
const waiting = ref(true)

const labelForOpen = Blockly.Msg.CALCIUM_UI_OPEN
const labelForReset = Blockly.Msg.CALCIUM_UI_RESET
const labelForRun = Blockly.Msg.CALCIUM_UI_RUN
const labelForSave = Blockly.Msg.CALCIUM_UI_SAVE

async function loadSampleCode() {
  const params = new URLSearchParams(window.location.search)
  const c = params.get('c')
  if (c) {
    const response = await fetch(`/samples/${c}.json`)
    const json = await response.json()
    Blockly.serialization.workspaces.load(json, workspace!)
  }
}

function open() {
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
        Blockly.serialization.workspaces.load(JSON.parse(json), workspace!)
      }
    })
    reader.readAsText(file)
  })
  inputFile.click()
}

function resetRuntime() {
  worker?.terminate()
  worker = null
  running.value = false
  inputting.value = false
  waiting.value = true
  worker = new Worker('/script/worker.js')
  worker.onmessage = (event) => {
    const message = event.data
    if (message.loaded) {
      waiting.value = false
    } else if (message.output || message.output === '') {
      output.value += message.output
      output.value += '\n'
    } else if (message.error) {
      error.value += message.error
      error.value += '\n'
    } else if (message.input || message.input === '') {
      input.value = ''
      prompt.value = message.input
      inputting.value = true
      overlayed.value = true
    }
  }
}

function resize() {
  const divBlockly = document.querySelector('#div-blockly') as HTMLDivElement
  divBlockly.style.height = window.innerHeight - 80 + 'px'
  divBlockly.style.width = window.innerWidth - 8 + 'px'
  Blockly.svgResize(workspace!)
}

function run() {
  const _pseudoCode = pseudoGenerator.workspaceToCode(workspace!)
  pseudoCode.value = _pseudoCode

  const jsonCode = calciumGenerator.workspaceToCode(workspace!)
  code.value = jsonCode
  const _code = `runtime = Runtime('${jsonCode
    .replace(/([^\\])\n/g, '$1')
    .replace(/'/g, "\\'")}')
result = runtime.run()
print(end='', flush=True)
result.value
`
  worker?.postMessage({ code: _code })
}

function save() {
  const json = Blockly.serialization.workspaces.save(workspace!)
  const a = document.createElement('a')
  a.href =
    'data:application/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(json))
  a.download = 'code.json'
  a.click()
}

function sendInput() {
  inputting.value = false
  overlayed.value = false
  worker?.postMessage({
    input: input.value.replace(/\n/g, '').replace(/'/g, "\\'"),
  })
}

onMounted(() => {
  Blockly.common.defineBlocks(calciumBlocks)
  workspace = Blockly.inject(document.querySelector('#div-blockly')!, {
    move: {
      scrollbars: true,
      drag: true,
      wheel: false,
    },
    zoom: {
      controls: true,
      startScale: 0.7,
    },
    renderer: 'calcium_renderer',
    sounds: false,
    theme: DarkTheme as any,
    toolbox: {
      kind: 'categoryToolbox',
      contents: calciumToolbox,
    },
  })
  resize()
  window.addEventListener('resize', resize, false)
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault()
    e.returnValue = 'c'
  })
  resetRuntime()
  loadSampleCode()
})

watch(running, (newValue) => {
  if (newValue) {
    output.value = ''
    run()
  } else {
    inputting.value = false
  }
  error.value = ''
})

watch(
  overlayed, (newValue) => {
    if (inputting.value) {
      overlayed.value = true
    } else {
      overlayed.value = newValue
    }
  })
</script>

<template>
  <v-app>
    <v-app-bar app color="blue">
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
        <v-btn icon href="https://calcium.0xcaf2.help/" target="_blank">
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
