<template>
  <div :class="['menu-button', windowOpen ? 'active' : '']">
    <a
      ref="menuButton"
      :class="['menu-link', windowOpen ? 'active' : '']"
      v-on:click="windowToggle"
    >
      <MenuIcon :class="['menu-icon', windowOpen ? 'active' : '']"/>
      <ui-ripple-ink trigger="menuButton"></ui-ripple-ink>
    </a>

    <div
      v-if="onboarding"
      class="sonar"
    >
    </div>
  </div>
</template>

<script>
import MenuIcon from '../svg/ic_more_horiz_black_24px.svg'

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