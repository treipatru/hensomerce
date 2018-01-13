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
    </a>
    <a
      href="#"
      ref="settings"
      v-bind:class="['menu-item', viewActive === 'settings' ? 'active' : '']"
      v-on:click.prevent="emitButtonClick('settings')"
    >
      <SettingsIcon/>
    </a>
  </div>
</template>

<script>
  import AddIcon from '../svg/ic_add_box_black_24px.svg'
  import SettingsIcon from '../svg/ic_settings_applications_black_24px.svg'

  export default {
    components: {
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