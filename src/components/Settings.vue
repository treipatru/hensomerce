<template>
  <ui-button type="primary"
             size="small"
             color="red"
             @click="clearStorage">
             Reset Data
  </ui-button>
</template>

<script>
import { UiButton } from 'keen-ui'

  export default {
    components: {
      UiButton
    },
    methods: {
      clearStorage: function () {
        chrome.storage.local.clear()
        location.reload()
      }
    }
  }
</script>