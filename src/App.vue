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
        <v-slide-y-transition @after-leave="toggleDebugButtons">
          <div
            class="d-flex align-center"
            v-if="!showingDebugButtons && !running"
          >
            <v-btn color="white" @click="">
              <v-icon dark x-large>mdi-download</v-icon>
              <span>{{ labelForSave }}</span>
            </v-btn>
            <v-btn color="white" @click="$emit('open')">
              <v-icon dark x-large>mdi-file-document-outline</v-icon>
              <span>{{ labelForOpen }}</span>
            </v-btn>
          </div>
        </v-slide-y-transition>
        <v-slide-y-reverse-transition @after-leave="toggleDebugButtons">
          <div
            class="d-flex align-center"
            v-if="showingDebugButtons && running"
          >
            <v-progress-circular
              color="white"
              :indeterminate="waiting"
              class="mr-2"
            ></v-progress-circular>
            <v-btn color="white" :disabled="debuggerEnabled" @click="">
              <span>{{ labelForStep }}</span>
            </v-btn>
            <v-btn
              color="white"
              :disabled="debuggerEnabled"
              @click="$emit('continue')"
            >
              <v-icon dark>mdi-play</v-icon>
              <span>{{ labelForContinue }}</span>
            </v-btn>
            <v-btn color="white" @click="$emit('copy')">
              <v-icon dark x-large>mdi-clipboard-outline</v-icon>
              <span>{{ labelForCopy }}</span>
            </v-btn>
          </div>
        </v-slide-y-reverse-transition>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <div ref="workspace"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang>
import * as Blockly from 'blockly/core'
import * as Ja from 'blockly/msg/ja'
import { defineComponent } from 'vue'

Blockly.setLocale(Ja)

export default defineComponent({
  name: 'App',
  data: () => ({
    debuggerEnabled: false,
    waiting: false,
    running: false,
    showingDebugButtons: false,
  }),
  computed: {
    labelForContinue: () => '次へ進む', // Blockly.Msg.CALCIUM_UI_CONTINUE,
    labelForCopy: () => 'コードをコピー', // Blockly.Msg.CALCIUM_UI_COPY,
    labelForOpen: () => '開く', // Blockly.Msg.CALCIUM_UI_OPEN,
    labelForRun: () => 'プログラムを実行', // Blockly.Msg.CALCIUM_UI_RUN,
    labelForSave: () => '保存する', // Blockly.Msg.CALCIUM_UI_SAVE,
    labelForStep: () => '１行進む', // Blockly.Msg.CALCIUM_UI_STEP,
  },
  methods: {
    toggleDebugButtons() {
      if (this.running) {
        if (!this.showingDebugButtons) {
          this.showingDebugButtons = true
        }
      } else {
        if (this.showingDebugButtons) {
          this.showingDebugButtons = false
        }
      }
    },
  },
  watch: {
    running(newValue) {
      this.waiting = newValue
    },
  },
})
</script>
