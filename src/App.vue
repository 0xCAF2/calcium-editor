<script setup lang="ts">
import * as Blockly from 'blockly/core'
import * as Lang from 'blockly/msg/ja'
import './ja'
import DarkTheme from '@blockly/theme-dark'
import { calciumBlocks } from './blocks'
import { calciumToolbox } from './toolbox'
import { CalciumGenerator } from './calcium-generator'
import { PseudoGenerator, Options } from './pseudo-generator'
import { Ref, onMounted, ref, watch } from 'vue'
import './renderer'
import { translate } from './ja'

Blockly.setLocale(Lang)

let workspace: Blockly.WorkspaceSvg | null = null
let worker: Worker | null = null
const pseudoGenerator = new PseudoGenerator('pseudo')
const calciumGenerator = new CalciumGenerator('calcium')

const code = ref('')
const error = ref('')
const input = ref('')
const inputting = ref(false)
const optionsList: Ref<Options[]> = ref([])
const output = ref('')
const overlayed = ref(false)
const pseudoCode = ref('')
const prompt = ref('')
const running = ref(false)
const waiting = ref(true)
const showingErrorMessage = ref(false)
const errorJp = ref('')

const labelForCancel = Blockly.Msg.CALCIUM_UI_CANCEL
const labelForOpen = Blockly.Msg.CALCIUM_UI_OPEN
const labelForRun = Blockly.Msg.CALCIUM_UI_RUN
const labelForSave = Blockly.Msg.CALCIUM_UI_SAVE

async function loadCode() {
    const params = new URLSearchParams(window.location.search)
    const c = params.get('c')
    if (c) {
        const response = await fetch(`/samples/${c}.json`)
        const json = await response.json()
        Blockly.serialization.workspaces.load(json, workspace!)
    } else {
        const code = localStorage.getItem('code')
        if (code) {
            Blockly.serialization.workspaces.load(JSON.parse(code), workspace!)
        }
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

function parseErrorMessage(msg: String): String {
    const errorLines = msg.split('\n')
    // drop the last empty line
    errorLines.pop()
    const calciumErrorLine = errorLines.pop()
    return translate(calciumErrorLine) || ''
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
            error.value += message.error.toString()
            errorJp.value = `${message.line} 行目でエラーが発生しました： ${parseErrorMessage(message.error.toString())}`
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

function parse() {
    pseudoGenerator.clearOptions()
    const _pseudoCode = pseudoGenerator.workspaceToCode(workspace!)
    pseudoCode.value = _pseudoCode
    optionsList.value = pseudoGenerator.optionsList
    for (const options of optionsList.value) {
        watch(() => options.selected, (newValue) => {
            const index = options.options.indexOf(newValue as unknown as string)
            options.index = index
            pseudoCode.value = pseudoGenerator.workspaceToCode(workspace!)
            calciumGenerator.indices = optionsList.value.map((options) => options.index)
            code.value = calciumGenerator.workspaceToCode(workspace!)
        })
    }

    calciumGenerator.indices = null
    const jsonCode = calciumGenerator.workspaceToCode(workspace!)
    code.value = jsonCode
}

function run() {
    output.value = ''
    error.value = ''
    errorJp.value = ''
    showingErrorMessage.value = false
    const _code = `runtime = Runtime('${code.value
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
    })
    resetRuntime()
    loadCode()
    workspace.addChangeListener((e) => {
        const json = Blockly.serialization.workspaces.save(workspace!)
        const code = JSON.stringify(json)
        localStorage.setItem('code', code)
    })
})

watch(running, (newValue) => {
    if (newValue) {
        output.value = ''
        parse()
    } else {
        inputting.value = false
    }
    error.value = ''
    showingErrorMessage.value = false
    errorJp.value = ''
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
                <!-- show run button with icon -->
                <v-btn icon @click="run" size="large" v-show="running">
                    <span><b>▶</b></span>
                </v-btn>
                <v-btn @click="save" size="large" v-show="!running">
                    <span>{{ labelForSave }}</span>
                </v-btn>
                <v-btn @click="open" size="large" v-show="!running">
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
                            <v-list-item-title>{{ labelForCancel }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar-title>
            <template v-slot:append>
                <v-btn icon href="https://help.capg.app/" target="_blank">
                    <span><b>？</b></span>
                </v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <v-container class="mx-0">
                <v-row v-show="!running">
                    <v-col class="pa-0" cols="12">
                        <div id="div-blockly"></div>
                    </v-col>
                </v-row>
                <v-row v-show="running && optionsList.length > 0">
                    <p v-for="(options, index) in optionsList" :key="index" style="z-index: 3000">
                        問{{ index + 1 }}: <v-select :items="options.options" v-model="options.selected" dense
                            outlined></v-select>
                    </p>
                </v-row>
                <v-row v-show="running">
                    <v-textarea variant="outlined" bg-color="grey-darken-4" v-model="output" readonly
                        style="z-index: 2000; font-weight: bold"></v-textarea>
                </v-row>
                <v-row v-show="error">
                    <p style="color: red; font-weight: bold">{{ errorJp }}</p>
                </v-row>
                <v-row v-show="error && !showingErrorMessage">
                    <v-btn @click="showingErrorMessage = true" color="red">元のエラーを表示</v-btn>
                </v-row>
                <v-row v-show="error && showingErrorMessage">
                    <v-textarea variant="outlined" bg-color="white" v-model="error" base-color="red" color="red"
                        style="color: red; font-weight: bold" readonly></v-textarea>
                </v-row>
                <v-row v-show="running">
                    <v-textarea id="div-pseudo" style="z-index: 1000;" variant="outlined" bg-color="white"
                        v-model="pseudoCode" base-color="blue" color="blue" readonly auto-grow></v-textarea>
                </v-row>
            </v-container>
            <v-dialog v-model="overlayed" id="dialog">
                <v-text-field base-color="white" bg-color="white" color="black" variant="solo-filled" autofocus
                    :label="prompt" v-model="input" />
                <v-btn @click="sendInput" color="blue">OK</v-btn>
            </v-dialog>
        </v-main>
    </v-app>
</template>

<style scoped>
.v-textarea {
    font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Mono',
        Consolas, 'Courier New', monospace;
}

#dialog {
    max-width: 640px;
}
</style>
