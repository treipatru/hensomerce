<template>
  <div class="view reset">
    <p class="header">{{str.header}}</p>
    <p class="subheader reset">
      {{str.subhReset}}
      <HelpIcon class="help" ref="tooltip"/>
      <ui-tooltip
        trigger="tooltip"
        position="bottom center"
        :openDelay="600"
      >
        {{str.helpText}}
      </ui-tooltip>
    </p>
    <div class="reset-wrap">
      <ui-button
        type="primary"
        raised
        size="small"
        color="default"
        class="resetb"
        @click="resetState = !resetState"
      >
        {{resetState ? str.confirmB : str.resetB}}
      </ui-button>
      <transition name="fade">
        <ui-button
          type="primary"
          raised
          size="small"
          color="red"
          @click="resetData"
          v-if="resetState"
        >
          {{str.resetYes}}
        </ui-button>
      </transition>
    </div>
  </div>
</template>

<script>
  import HelpIcon from '../svg/ic_help_outline_black_24px.svg'
  import { UiButton, UiTooltip } from 'keen-ui'

  export default {
    components: {
      UiButton,
      HelpIcon,
      UiTooltip
    },
    data() {
      return {
        str: {
          header: 'Reset',
          subhReset: 'Delete extension data',
          resetB: 'No Ragrets',
          confirmB: 'Some Ragrets',
          resetYes: 'Reset',
          helpText: 'Only extension data is deleted. Your Chrome bookmarks are NOT affected.'
        },
        resetState: false,
      }
    },
    methods: {
      resetData: function () {
        this.$emit('resetData')
      },
    }
  }
</script>