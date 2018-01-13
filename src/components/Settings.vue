<template>
  <div class="view settings">
    <p class="header">{{str.header}}</p>

    <!-- APP OPTIONS CONTROLLERS -->
    <p class="subheader">{{str.subhCols}}</p>
    <ui-select
      :options="columnsNo"
      v-model="columnsSel"
      class="columns-input"
      @select="dataExport.columns =  columnsSel"
      :placeholder="optionsInput.columns"
    >
    </ui-select>

    <p class="subheader">{{str.subhTheme}}</p>
    <ui-select
      :options="themes"
      v-model="themeSel"
      :keys="{ label: 'name', value: 'id' }"
      class="themes-input"
      @select="dataExport.theme =  themeSel.id"
      :placeholder="optionsInput.theme"
    >
    </ui-select>

    <ui-button
      type="primary"
      raised
      size="small"
      color="primary"
      class="options-save"
      @click="saveOptions"
    >
      {{str.saveB}}
    </ui-button>

    <hr>

    <!-- RESET EXTENSION DATA -->
    <p class="subheader">{{str.subhReset}}</p>
    <div class="reset-wrap">
      <ui-button
        type="secondary"
        raised
        size="small"
        color="primary"
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
  import {UiButton, UiSelect} from 'keen-ui'

  export default {
    components: {
      UiButton,
      UiSelect
    },
    data() {
      return {
        str: {
          header: 'Settings',
          subhReset: 'Reset everything',
          resetB: 'No Ragrets',
          confirmB: 'Cancel',
          resetYes: 'Reset',
          subhCols: 'Columns',
          subhTheme: 'Theme',
          saveB: 'Save',
        },
        resetState: false,
        columnsNo: ['2', '3', '4'],
        columnsSel: '',
        themeSel: {},
        themes: [
          {
            name: 'Light',
            id: 'light'
          },
          {
            name: 'Dark',
            id: 'dark'
          }
        ],
        themesSel: this.optionsInput.theme,
        dataExport: {
          columns: this.optionsInput.columns,
          theme: this.optionsInput.theme
        }
      }
    },
    methods: {
      resetData: function () {
        this.$emit('resetData')
      },
      saveOptions: function () {
        this.$emit('saveOptions', this.dataExport)
      }
    },
    mounted: function () {
    },
    props: {
      optionsInput: {
        type: Object,
        required: true
      }
    }
  }
</script>