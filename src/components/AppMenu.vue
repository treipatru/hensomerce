<template>
  <div class="menu-container">
    <div class="grid-right reset-space">
      <div class="col reset-space">
        <div class="menu-wrapper">
          <transition name="fade">

            <div class="menu-actions"
                  v-if="windowOpen">
                  <ui-button type="secondary"
                             size="small"
                             v-on:click="emitButtonClick('settings')">
                             Settings
                  </ui-button>
                  <ui-button type="secondary"
                             size="small"
                             v-on:click="emitButtonClick('manage')">
                             Manage
                  </ui-button>
                  <ui-button type="secondary"
                             size="small"
                             ref="add"
                             v-on:click="emitButtonClick('add')">
                             Add
                  </ui-button>
            </div>
          </transition>

          <menu-button v-on:windowToggle="windowToggle">
          </menu-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuButton from './MenuButton.vue'

import { UiButton } from 'keen-ui';

export default {
  components: {
    MenuButton,
    UiButton
  },
  data () {
    return {
    }
  },
  methods: {
    emitButtonClick: function (id) {
      this.$emit('emitButtonClick', id)
    },
    windowToggle: function () {
      this.$emit('windowToggle')
    }
  },
  props: [
    'windowOpen'
  ]
}
</script>