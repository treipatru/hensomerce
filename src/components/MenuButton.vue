<template>
  <div id="menu-button">
    <ui-icon-button icon="menu" 
                    size="small"
                    type="secondary"
                    @click="windowToggle">
                    <slot><MenuIcon class="menu-icon"/></slot>
    </ui-icon-button>

    <transition name="fade">
      <div class="optionsMenu">
      </div>
    </transition>
  </div>
</template>

<script>
  import { UiIconButton } from 'keen-ui'
  import MenuIcon from '../svg/menu.svg'

  export default {
    components: {
      UiIconButton,
      MenuIcon
    },
    methods: {
      windowToggle: function () {
        this.$emit('windowToggle')
      }
    }
  }
</script>