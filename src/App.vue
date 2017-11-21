<template>
  <div id="hensomerce">
    
    <div id="content" class="grid">
      <list v-for="(list, index) in storeCache.lists"
            :list-data="list"
            :key="index">
      </list>
    </div>

    <transition name="fade">
      <select-folder v-if="isChoosing"
                     v-on:saveList="saveList">
      </select-folder>
    </transition>

    <add-button v-on:createList="toggleAddList">
    </add-button>

  </div>
</template>

<script>
import List from './components/List.vue'
import AddButton from './components/AddButton.vue'
import SelectFolder from './components/SelectFolder.vue'

export default {
  created: function () {
    this.syncStorageDown()
  },

  components: {
    AddButton,
    SelectFolder,
    List
  },

  data () {
    return {
      storeCache: {},
      isChoosing: false,
      lists: []
    }
  },

  methods: {
    syncStorageDown: function () {
      let vm = this
      chrome.storage.local.get(null, function(items) {
        vm.storeCache = items
      });
    },
    syncStorageUp: function () {
      let vm = this
      chrome.storage.local.clear();
      chrome.storage.local.set(vm.storeCache, function() {
      });
    },
    toggleAddList: function () {
      if (this.isChoosing) {
        this.isChoosing = false
      } else {
        this.isChoosing = true
      }
    },
    saveList: function (obj) {
      if (!this.storeCache.lists) {
        this.storeCache.lists = []
      }
      this.storeCache.lists.push(obj)
      this.toggleAddList()
      this.syncStorageUp()
    }
  }
}
</script>