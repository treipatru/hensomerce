<template>
  <div class="view">
    <div class="grid-12-column">
      <div
        class="col-4"
        data-push-left="off-4"
      >
        <ui-select
          has-search
          :options="folders"
          :keys="{ label: 'title', value: 'id' }"
          v-model="userInput"
          @select="selectFolder"
          ref="searchInput"
          class="search-input"
        >
        </ui-select>
      </div>

      <div
        class="col-4"
        data-push-left="off-4"
      >
        <ui-checkbox
          v-model="includeSubfolders"
          :disabled="!selHasSubfolders"
        >
          Include subfolders?
        </ui-checkbox>
        <ui-checkbox
          v-model="makeChildrenBoxes"
          :disabled="!includeSubfolders"
        >
          In individual boxes?
        </ui-checkbox>
      </div>

      <div
        class="col-4 center-content"
        data-push-left="off-4"
      >
        <ui-button
          color="primary"
          type="secondary"
          @click="cancelSelection"
          class=""
        >
          Cancel
        </ui-button>
        <ui-button
          color="primary"
          type="primary"
          @click="saveSelection"
          class=""
          :disabled="userInput ? false : true"
        >
          Save
        </ui-button>
      </div>
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
        userInput: '',
        folderChromeData: [],
        links: {},
        linksRec: {},
        includeSubfolders: false,
        selHasSubfolders: false,
        makeChildrenBoxes: false
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
        // Recursively look for bookmarks in a folder and create
        // data for dropdown list
        let vm = this

        if (obj.children) {
          // If obj has children, skip
          for (var i = 0; i < obj.children.length; i++) {
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
        vm.selHasSubfolders = false

        chrome.bookmarks.getChildren(vm.userInput.id, function (res) {
          vm.folderChromeData = res
          vm.getChildren(vm.folderChromeData)
          vm.getChildrenRec(vm.folderChromeData)
        })
      },
      getChildren: function (arr) {
        // Extract first level bookmarks from a folder
        let vm = this

        for (let elem of arr) {
          if (elem.url) {
            vm.links[elem.id] = {
              title: elem.title,
              url: elem.url
            }
          }
        }
      },
      getChildrenRec: function (arr) {
        // Recursively extract bookmarks from a folder
        let vm = this

        for (let elem of arr) {
          // If it's a folder
          if (!elem.url) {
            chrome.bookmarks.getChildren(elem.id, function (res) {
              vm.getChildrenRec(res)

              //Allow user to select subfolders
              vm.selHasSubfolders = true
            })
          } else {
            // Or a bookmark
            if (elem.url) {
              vm.linksRec[elem.id] = {
                title: elem.title,
                url: elem.url
              }
            }
          }
        }
      },
      saveSelection: function () {
        let obj = {
          name: this.userInput.title,
          id: this.userInput.id,
          links: null
        }

        if (this.includeSubfolders) {
          obj.links = this.linksRec
        } else {
          obj.links = this.links
        }

        this.$emit('saveList', obj, obj.id)
      },
      cancelSelection: function () {
        this.$emit('cancelSelection')
      }
    },

    props: [
      'lists'
    ]
  }
</script>