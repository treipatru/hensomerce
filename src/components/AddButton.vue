<template>
  <div id="add-button">
    <ui-button color="primary"
               type="secondary"
               @click="addFolder">
      +
    </ui-button>
  </div>
</template>

<script>
  import { UiButton } from 'keen-ui';

  export default {
    components: {
      UiButton
    },
    data () {
      return {
      }
    },
    methods: {
      addFolder: function () {
        this.$emit('createList')
      }
    }
  }
</script>