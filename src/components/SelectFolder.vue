<template>
  <div class="select-folder">
    <ui-select  has-search
                :options="folders"
                :keys="{ label: 'title', value: 'id' }"
                v-model="userInput"
                @select="selectFolder"
                ref="searchInput">
  </ui-select>
  <ui-button color="primary"
             type="primary"
             @click="saveSelection"
             :disabled="buttonStatus">
             Save
  </ui-button>
</div>
</template>

<script>
import { UiSelect, UiButton } from 'keen-ui';

export default {
  components: {
    UiSelect,
    UiButton
  },
  computed: {
    buttonStatus: function () {
      if (this.userInput) {
        return false
      } else {
        return true
      }
    }
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
    }
  },
  mounted: function () {
    let vm = this

    setTimeout(function () {
      vm.$refs.searchInput.toggleDropdown()
    }, 300)
  },
  props: [
  ]
}
</script>