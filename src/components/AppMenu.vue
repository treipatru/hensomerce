<template>
  <div
    class="menu-actions"
    v-if="windowOpen"
  >
    <a
      href="#"
      ref="add"
      v-bind:class="['menu-item', viewActive === 'add' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('add')"
    >
      <AddIcon/>
      <ui-ripple-ink trigger="add"></ui-ripple-ink>
    </a>
    <a
      href="#"
      ref="settings"
      v-bind:class="['menu-item', viewActive === 'settings' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('settings')"
    >
      <SettingsIcon/>
      <ui-ripple-ink trigger="settings"></ui-ripple-ink>
    </a>
  </div>
</template>

<script>
  import AddIcon from '../svg/ic_add_box_black_24px.svg'
  import SettingsIcon from '../svg/ic_settings_applications_black_24px.svg'
  import { UiRippleInk } from 'keen-ui';

  export default {
    components: {
      UiRippleInk,
      AddIcon,
      SettingsIcon
    },
    data () {
      return {
      }
    },
    methods: {
      emitButtonClick: function (id) {
        this.$emit('emitButtonClick', id)
      }
    },
    props: [
      'windowOpen', 'viewActive'
    ]
  }
</script>