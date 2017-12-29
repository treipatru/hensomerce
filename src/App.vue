<template>
  <div id="hensomerce" :class="windowOpen ? 'active' : ''">

    <app-menu v-on:emitButtonClick="handleMenuClick"
              v-on:windowToggle="windowToggle"
              :window-open="windowOpen"
              :view-active="viewActive">
    </app-menu>

    <div v-bind:class="['content', {'active' : viewActive}]">



      <transition-group name="fade" mode="out-in">

        <!-- Render page content -->
        <div :key="1"
             v-show="!windowOpen">
             <transition-group name="fade"
                               mode="out-in">
                               <no-content v-show="!hasContent"
                                           :key="1">
                               </no-content>

                               <div class="boxes-container"
                                    v-show="hasContent"
                                    ref="boxesContainer"
                                    :key="2"
                                    v-packery='{
                                     itemSelector: ".box",
                                     percentPosition: true,
                                     gutter: 15,
                                     initLayout: false,
                                    }'>
                                    <div v-for="(list, index) in storeCache.lists"
                                         v-packery-item class='box'
                                         :key="list.id">
                                         <list :list-data="list"
                                               v-on:deleteList="deleteList">
                                         </list>
                                    </div>
                               </div>
              </transition-group>
        </div>

        <!-- Render action window -->
        <div id="action-window"
             class="grid"
             :key="2"
             v-show="windowOpen">
             <transition name="fade"
                         mode="out-in">
                         <add-folder v-if="viewActive === 'add'"
                                     :key="1"
                                     :lists="storeCache.lists"
                                     v-on:saveList="saveList"
                                     v-on:cancelSelection="windowOpen = !windowOpen">
                         </add-folder>

                         <manage v-if="viewActive === 'manage'"
                                 :key="2">
                         </manage>

                         <settings v-if="viewActive === 'settings'"
                                   :key="3">
                         </settings>
             </transition>
        </div>
      </transition-group>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AppMenu from './components/AppMenu.vue'
import List from './components/List.vue'

import NoContent from './components/NoContent.vue'
import AddFolder from './components/AddFolder.vue'
import Manage from './components/Manage.vue'
import Settings from './components/Settings.vue'

export default {
  created: function () {
    this.syncStorageDown()
    console.log(this.storeCache.lists)
  },

  components: {
    AppMenu,
    List,
    NoContent,
    AddFolder,
    Manage,
    Settings
  },

  computed: {
    hasContent: function () {
      if (Object.keys(this.storeCache.lists).length !== 0) {
        return true
      } else {
        return false
      }
    }
  },

  data () {
    return {
      storeCache: {
        lists: {}
      },
      windowOpen: false,
      viewActive: ''
    }
  },

  methods: {
    syncStorageDown: function () {
      let vm = this
      chrome.storage.local.get(null, function(items) {
        vm.storeCache = items
      })
    },
    syncStorageUp: function () {
      let vm = this
      chrome.storage.local.clear()
      chrome.storage.local.set(vm.storeCache, function() {
      })
    },
    saveList: function (obj, id) {
      if (!this.storeCache.lists) {
        this.storeCache.lists = {}
      }

      Vue.set(this.storeCache.lists, id, obj)

      this.windowOpen = !this.windowOpen
      this.syncStorageUp()
    },
    deleteList: function (id) {
      Vue.delete(this.storeCache.lists, id)
      this.syncStorageUp()
    },
    handleMenuClick: function (id) {
      this.viewActive = id
    },
    windowToggle: function () {
      this.windowOpen = !this.windowOpen
      this.viewActive = 'add'
    }
  },
  mounted: function () {
    let vm = this

    chrome.bookmarks.onCreated.addListener(function(id, obj) {
      console.log('Created: ' + id)
      console.log(obj)
    })

    chrome.bookmarks.onRemoved.addListener(function(id, obj) {
      console.log('Removed: ' + id)
      console.log(obj)
    })

    chrome.bookmarks.onChanged.addListener(function(id, obj) {
      chrome.bookmarks.get(id, function(res) {
        let parent = res[0].parentId
        let id = res[0].id

        // If parent is in the grid
        if (vm.storeCache.lists[parent]) {
          vm.storeCache.lists[parent].links[id].title = res[0].title
          vm.storeCache.lists[parent].links[id].url = res[0].url
          vm.syncStorageUp()
        }

        // If obj is a folder in the grid
        if (vm.storeCache.lists[id]) {
          vm.storeCache.lists[id].name = res[0].title
          vm.syncStorageUp()
        }
      })
    })

    chrome.bookmarks.onMoved.addListener(function(id, obj) {
      console.log('Moved: ' + id)
      console.log(obj)
    })

    chrome.bookmarks.onChildrenReordered.addListener(function(id, obj) {
      console.log('Children reordered: ' + id)
      console.log(obj)
    })
  }
}
</script>