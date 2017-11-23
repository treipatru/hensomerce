<template>
  <div class="view">
    <div class="body">
      <ui-select  has-search
                  :options="folders"
                  :keys="{ label: 'title', value: 'id' }"
                  v-model="userInput"
                  @select="selectFolder"
                  ref="searchInput"
                  class="search-input">
      </ui-select>
      <ui-button color="primary"
                 type="secondary"
                 @click="cancelSelection"
                 :class="userInput ? 'visible' : 'invisible'">
                 Cancel
      </ui-button>
      <ui-button color="primary"
                 type="primary"
                 @click="saveSelection"
                 :class="userInput ? 'visible' : 'invisible'"
                 :disabled="userInput ? false : true">
                 Save
      </ui-button>
  </div>
</div>
</template>

<script>
import { UiSelect, UiButton } from 'keen-ui';

export default {
  components: {
    UiSelect,
    UiButton
  },

  created: function () {
    this.getChromeFolders()
  },

  data () {
    return {
      folders: [],
      userInput: '',
      folderChromeData: [],
      links: []
    }
  },

  methods: {
    getChromeFolders: function () {
      let vm = this
      chrome.bookmarks.getTree(function (res) {
        vm.getFoldersData(res[0])
      })
    },
    getFoldersData: function (obj) {
      // Recursively look for bookmarks in a folder
      let vm = this

      if (obj.children) {
        let entry = {
          id: obj.id,
          title: obj.title
        }

        if (entry.title) {
          vm.folders.push(entry)
        }

        for (var i = 0; i < obj.children.length;i++) {
          vm.getFoldersData(obj.children[i])
        }
      }
    },
    selectFolder: function () {
      let vm = this

      chrome.bookmarks.getChildren(vm.userInput.id, function(res) {
        vm.folderChromeData = res
        vm.getChildren(vm.folderChromeData)
      })
    },
    getChildren: function (arr) {
      // Recursively extracts bookmarks from a folder
      let vm = this

      for (let elem of arr) {
        if (!elem.url) {
          chrome.bookmarks.getChildren(elem.id, function (res) {
            vm.getChildren(res)
          })
        } else {
          let link = {
            title: elem.title,
            url: elem.url
          }
          vm.links.push(link)
        }
      }
    },
    saveSelection: function () {
      let obj = {
        [this.userInput.title]: this.links
      }
      this.$emit('saveList', obj)
    },
    cancelSelection: function () {
      this.$emit('cancelSelection')
    }
  },

  mounted: function () {
    let vm = this

    setTimeout(function () {
      vm.$refs.searchInput.toggleDropdown()
    }, 200)
  }
}
</script>