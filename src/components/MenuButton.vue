<template>
  <div :class="['menu-button', windowOpen ? 'active' : '']">
    <a
      ref="menuButton"
      :class="['menu-link', windowOpen ? 'active' : '']"
      v-on:click="windowToggle"
    >
      <MenuIcon :class="['menu-icon', windowOpen ? 'active' : '']"/>
    </a>

    <div
      v-if="onboarding && !windowOpen"
      class="sonar"
    >
    </div>
  </div>
</template>

<script>
import MenuIcon from '../svg/ic_more_horiz_black_24px.svg'

export default {
  components: {
    MenuIcon
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