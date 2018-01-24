<template>
  <div class="view settings">
    <p class="header">{{str.header}}</p>
    <div class="cols-wrap">
      <div class="box">
        <p class="subheader">{{str.subhCols}}</p>
        <ui-select
          :options="columnsNo"
          v-model="columnsSel"
          class="columns-input"
          @select="dataExport.columns =  columnsSel"
          :placeholder="optionsInput.columns"
        >
        </ui-select>
      </div>

      <div class="box">
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
      </div>
    </div>

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
          subhCols: 'Columns',
          subhTheme: 'Theme',
          saveB: 'Save',
        },
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