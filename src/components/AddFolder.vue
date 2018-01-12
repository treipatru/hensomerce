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
        @change="exportRecursive"
      >
        Include subfolders?
      </ui-checkbox>
    </div>

    <div class="buttons">
      <ui-button
        color="primary"
        type="secondary"
        @click="cancelSelection"
      >
        Cancel
      </ui-button>
      <ui-button
        color="primary"
        type="primary"
        @click="saveSelection"
        :disabled="userInput ? false : true"
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
        folderChromeData: [],
        includeSubfolders: false,
        selHasSubfolders: false,
        exports: {}
      }
    },

    methods: {
      getChromeData: function () {
        // Get top level bookmark folders
        let vm = this
        chrome.bookmarks.getTree(function (res) {
          vm.getFoldersData(res[0])
        })
      },

      getFoldersData: function (obj) {
        // Recursively look for bookmarks in root
        // and create data for dropdown list
        let vm = this

        if (obj.children) {
          // If obj has children, skip
          for (let i = 0; i < obj.children.length; i++) {
            vm.getFoldersData(obj.children[i])
          }
        }
        else if (!obj.children) {
          // If obj does not have children get it's parent and add it to select
          chrome.bookmarks.get(obj.parentId, function (res) {
            let elTitle = res[0].title
            let lists = vm.lists || {}
            let lastFolder = vm.folders[vm.folders.length - 1] || ''

            // Bookmark parents show only once in list
            // and are hidden if already loaded
            if (elTitle !== lastFolder.title && !lists[res[0].id]) {
              let entry = {
                id: obj.parentId,
                title: elTitle
              }

              vm.folders.push(entry)
            }
          })
        }
      },

      selectFolder: function () {
        let vm = this

        // Clear previous folder status
        Object.keys(vm.exports).forEach(function(key) {
          delete vm.exports[key]
        })
        vm.selHasSubfolders = false
        vm.includeSubfolders = false

        chrome.bookmarks.getChildren(vm.userInput.id, function (res) {
          vm.folderChromeData = res
          vm.makeList(vm.folderChromeData)

          for (let elem of res) {
            if (!elem.url) {
              vm.selHasSubfolders = true
              return
            }
          }
        })
      },

      makeList: function (arr) {
        // Extract first level bookmarks from a folder
        let vm = this
        vm.exports[vm.userInput.id] = {
          id: vm.userInput.id,
          links: {},
          name: vm.userInput.title
        }

        for (let elem of arr) {
          if (elem.url) {
            vm.exports[vm.userInput.id].links[elem.id] = {
              title: elem.title,
              url: elem.url
            }
          }
        }
      },

      makeListRecursive: function (arr, parentId, parentTitle) {
        // Recursively extract bookmarks from a folder
        let vm = this

        vm.exports[parentId] = {
          id: parentId,
          links: {},
          name: parentTitle
        }

        for (let elem of arr) {
          // If it's a folder
          if (!elem.url) {
            chrome.bookmarks.getChildren(elem.id, function (res) {
              vm.makeListRecursive(res, elem.id, elem.title)
            })
          } else {
            // Or a bookmark
            if (elem.url) {
              vm.exports[parentId].links[elem.id] = {
                title: elem.title,
                url: elem.url
              }
            }
          }
        }
      },

      exportRecursive: function () {
        if (this.includeSubfolders) {
          this.makeListRecursive(this.folderChromeData, this.userInput.id, this.userInput.title)
        }
      },

      saveSelection: function () {
        this.$emit('saveList', this.exports)
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