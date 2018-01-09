<template>
  <div class="view settings">
    <p class="header">Delete extension data</p>
    <div class="reset-wrap">
      <ui-button
        type="primary"
        size="small"
        color="primary"
        class="resetb"
        @click="resetState = !resetState"
      >
        {{resetState ? confirmLabel : resetLabel}}
      </ui-button>
      <transition name="fade">
      <ui-button
        type="primary"
        size="small"
        color="red"
        @click="resetData"
        v-if="resetState"
      >
        {{yes}}
      </ui-button>
      </transition>

    </div>
  </div>
</template>

<script>
import { UiButton } from 'keen-ui'

  export default {
    components: {
      UiButton
    },
    data () {
      return {
        resetLabel: 'Delete',
        confirmLabel: 'Cancel',
        yes: 'Delete',
        resetState: false
      }
    },
    methods: {
      resetData: function () {
        this.$emit('resetData')
      }
    }
  }
</script>