<template>
  <div :class="['menu-container', windowOpen ? 'active' : '']">
    <div class="grid-right reset-space">
      <div class="col reset-space">
        <div class="menu-wrapper">

          <a
            ref="menuButton"
            class="menu-button-wrapper"
            v-on:click="windowToggle"
          >
            <MenuIcon
              :class="['menu-button', onboarding ? 'onboarding' : '']"
            />
            <ui-ripple-ink trigger="menuButton"></ui-ripple-ink>
          </a>

            <div
              class="menu-actions"
              v-if="windowOpen"
            >
              <a
                href="#"
                ref="add"
                v-bind:class="['menu-item', viewActive === 'add' ? 'active' : '']"
                v-on:click.prevent="emitButtonClick('add')"
              >
                Add
                <ui-ripple-ink trigger="add"></ui-ripple-ink>
              </a>
              <a
                href="#"
                ref="manage"
                v-bind:class="['menu-item', viewActive === 'manage' ? 'active' : '']"
                v-on:click.prevent="emitButtonClick('manage')"
              >
                Manage
                <ui-ripple-ink trigger="manage"></ui-ripple-ink>
              </a>
              <a
                href="#"
                ref="settings"
                v-bind:class="['menu-item', viewActive === 'settings' ? 'active' : '']"
                v-on:click.prevent="emitButtonClick('settings')"
              >
                Settings
                <ui-ripple-ink trigger="settings"></ui-ripple-ink>
              </a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuIcon from '../svg/ic_menu_black_24px.svg'

import { UiRippleInk } from 'keen-ui';

export default {
  components: {
    MenuIcon,
    UiRippleInk
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
    'windowOpen', 'viewActive', 'onboarding'
  ]
}
</script>