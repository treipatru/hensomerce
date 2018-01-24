<template>
  <div
    class="menu-actions"
  >
    <a
      href="#"
      ref="add"
      v-bind:class="['menu-item', viewActive === 'add' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('add')"
    >
      <AddIcon/>
    </a>
    <a
      href="#"
      ref="settings"
      v-bind:class="['menu-item', viewActive === 'settings' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('settings')"
    >
      <SettingsIcon/>
    </a>
    <a
      href="#"
      ref="reset"
      v-bind:class="['menu-item', viewActive === 'reset' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('reset')"
    >
      <ResetIcon/>
    </a>
  </div>
</template>

<script>
  import AddIcon from '../svg/ic_add_black_24px.svg'
  import SettingsIcon from '../svg/ic_settings_black_24px.svg'
  import ResetIcon from '../svg/ic_settings_backup_restore_black_24px.svg'

  export default {
    components: {
      AddIcon,
      SettingsIcon,
      ResetIcon
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
      'viewActive'
    ]
  }
</script>