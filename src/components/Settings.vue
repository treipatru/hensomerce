<template>
  <div class="view">
    <div class="grid-12-column">
      <div
        class="col-4 center-content"
        data-push-left="off-4"
      >
        <ui-button
          type="primary"
          size="small"
          color="red"
          @click="resetData"
        >
          Reset Data
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import { UiButton } from 'keen-ui'

  export default {
    components: {
      UiButton
    },
    methods: {
      resetData: function () {
        this.$emit('resetData')
      }
    }
  }
</script>