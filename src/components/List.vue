<template>
  <div class="col">
    <div v-if="!renderList">
      <span>Load bookmarks from</span>
      <ui-select  has-search
                  :options="folders"
                  :keys="{ label: 'title', value: 'id' }"
                  v-model="userInput"
                  @select="selectFolder(userInput.id)">
    </ui-select>
  </div>
  <div v-if="renderList">
    <a v-for="item in links"
       :href="item.url">
      {{item.title}}
    </a>
  </div>
</div>
</template>

<script>
import { UiSelect } from 'keen-ui';

export default {
  components: {
    UiSelect
  },

  computed: {
    renderList: function () {
      if (this.links.length > 0) {
        return true
      }
    }
  },

  created: function () {
    if (!this.bookId) {
      this.getChromeFolders()
    }
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
    selectFolder: function (id) {
      let vm = this
      chrome.bookmarks.getChildren(id, function(res) {
        vm.folderChromeData = res
        vm.getChildren(vm.folderChromeData)
      })
    },
    getChildren: function (arr) {
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
    }
  },

  props: [
  'bookId'
  ]
}
</script>