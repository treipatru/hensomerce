<template>
  <div class="view add-folder">
    <p class="header">Add folder to homepage</p>
    <div class="searchBox">
      <ui-select
        has-search
        :options="folders"
        :keys="{ label: 'title', value: 'id' }"
        v-model="userInput"
        @select="selectFolder"
        ref="searchInput"
        class="search-input"
        placeholder="Search your folders"
        searchPlaceholder=""
      >
      </ui-select>
    </div>

    <div class="subfolders">
      <ui-checkbox
        v-model="includeSubfolders"
        :disabled="!selHasSubfolders"
        @change="exportSubfolders = !exportSubfolders"
      >
        Include subfolders?
      </ui-checkbox>
    </div>

    <div class="buttons">
      <ui-button
        color="default"
        type="primary"
        @click="cancelSelection"
        raised
      >
        Cancel
      </ui-button>
      <ui-button
        color="primary"
        type="primary"
        @click="saveSelection"
        :disabled="userInput ? false : true"
        raised
      >
        Save
      </ui-button>
    </div>
  </div>
</template>

<script>
  import {UiSelect, UiButton, UiCheckbox} from 'keen-ui';

  export default {
    components: {
      UiSelect,
      UiButton,
      UiCheckbox
    },

    created: function () {
      this.getChromeData()
    },

    data() {
      return {
        folders: [],
        userInput: {},
        countRec: 0,
        includeSubfolders: false,
        selHasSubfolders: false,
        exportSubfolders: false,
        exports: {}
      }
    },

    methods: {
      getChromeData: function () {
        // Process Chrome bookmarks tree
        let vm = this
        chrome.bookmarks.getTree(function (res) {
          vm.getFoldersData(res[0])
        })
      },

      getFoldersData: function (obj) {
        // Recursively look for folders in Chrome data
        // Create data for select list
        let vm = this

        if (obj.children) {
          // Only if it has a title and isn't already in grid
          if (obj.title && !vm.lists[obj.id]) {
            let entry = {
              id: obj.id,
              title: obj.title
            }
            vm.folders.push(entry)
          }

          for (let elem of obj.children) {
            vm.getFoldersData(elem)
          }
        }
      },

      selectFolder: function () {
        let vm = this
        // Clear old data
        vm.selHasSubfolders = false
        vm.includeSubfolders = false
        // Check for subfolders
        chrome.bookmarks.getChildren(vm.userInput.id, function (res) {
          for (let elem of res) {
            if (!elem.url) {
              vm.selHasSubfolders = true
              return
            }
          }
        })
      },

      makeList: function (id) {
        let vm = this

        chrome.bookmarks.get(id, function (res) {
          let listTitle = res[0].title

          chrome.bookmarks.getChildren(id, function (res) {
            vm.exports[id] = {
              id: id,
              links: {},
              name: listTitle
            }

            for (let elem of res) {
              if (elem.url) {
                vm.exports[id].links[elem.id] = {
                  title: elem.title,
                  url: elem.url
                }
              }
            }
            vm.$emit('saveList', vm.exports)
          })
        })
      },

      makeListRec: function (id) {
        let vm = this
        vm.countRec++

        chrome.bookmarks.get(id, function (res) {
          let listTitle = res[0].title

          chrome.bookmarks.getChildren(id, function (res) {
            vm.exports[id] = {
              id: id,
              links: {},
              name: listTitle
            }

            for (let i = 0; i < res.length; i++) {
              // Folders
              if (!res[i].url) {
                vm.makeListRec(res[i].id)
              } else {
                // Bookmarks
                if (res[i].url) {
                  vm.exports[id].links[res[i].id] = {
                    title: res[i].title,
                    url: res[i].url
                  }
                }
              }
              // If it's the last bookmark in the list
              // check to see if ready to save
              if (i === res.length - 1) {
                vm.countRec--
                if (vm.countRec === 0) {
                  vm.$emit('saveList', vm.exports)
                }
              }
            }
          })
        })
      },

      saveSelection: function () {
        let vm = this
        if (this.exportSubfolders) {
          vm.makeListRec(vm.userInput.id)
        } else {
          vm.makeList(vm.userInput.id)
        }
      },

      cancelSelection: function () {
        this.$emit('cancelSelection')
      }
    },

    props: {
      lists: {
        type: Object,
        required: false
      }
    }
  }
</script>