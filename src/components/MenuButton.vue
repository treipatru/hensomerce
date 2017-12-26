<template>
  <div id="menu-button">
    <ui-icon-button size="small"
                    type="secondary"
                    @click="windowToggle">
                    <MenuIcon/>
    </ui-icon-button>

    <transition name="fade">
      <div class="optionsMenu">
      </div>
    </transition>
  </div>
</template>

<script>
  import MenuIcon from '../svg/ic_menu_black_24px.svg'

  import { UiIconButton } from 'keen-ui'

  export default {
    components: {
      MenuIcon,
      UiIconButton
    },
    methods: {
      windowToggle: function () {
        this.$emit('windowToggle')
      }
    }
  }
</script>