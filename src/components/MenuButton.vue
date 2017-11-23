<template>
  <div id="menu-button">
    <ui-icon-button icon="more_vert" 
                    size="small"
                    color="primary"
                    type="secondary"
                    @click="windowToggle">
    </ui-icon-button>

    <transition name="fade">
      <div class="optionsMenu">
      </div>
    </transition>
  </div>
</template>

<script>
  import { UiIconButton } from 'keen-ui'

  export default {
    components: {
      UiIconButton
    },
    methods: {
      windowToggle: function () {
        this.$emit('windowToggle')
      }
    }
  }
</script>