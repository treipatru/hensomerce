<template>
  <div
    id="hensomerce"
    :class="windowOpen ? 'active' : ''"
  >

    <app-menu
      v-on:emitButtonClick="handleMenuClick"
      v-on:windowToggle="windowToggle"
      :window-open="windowOpen"
      :view-active="viewActive"
    >
    </app-menu>

    <div v-bind:class="['content', {'active' : viewActive}]">



        <!-- Render page content -->
        <div
          v-if="!windowOpen"
        >
            <onboarding
              v-if="onboarding"
            >
            </onboarding>

            <div
              v-else
              class="cards-container"
              ref="cardsContainer"
              v-packery='{
                itemSelector: ".card",
                percentPosition: true,
                gutter: 15,
                initLayout: false
                }'
            >
              <div
                v-for="(list, index) in storeCache.lists"
                v-packery-item class='card'
                :key="list.id"
              >
                <list
                  :list-data="list"
                  v-on:deleteList="deleteList"
                >
                </list>
              </div>
            </div>
        </div>

        <!-- Render action window -->
        <div
          id="action-window"
          class="grid"
          v-if="windowOpen"
        >
            <add-folder
              v-if="viewActive === 'add'"

              :lists="storeCache.lists"
              v-on:saveList="saveList"
              v-on:cancelSelection="windowOpen = !windowOpen"
            >
           </add-folder>
            <manage
              v-if="viewActive === 'manage'"
            >
            </manage>
            <settings
              v-if="viewActive === 'settings'"
              v-on:resetData="resetData"
            >
            </settings>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AppMenu from './components/AppMenu.vue'
import List from './components/List.vue'

import Onboarding from './components/Onboarding.vue'
import AddFolder from './components/AddFolder.vue'
import Manage from './components/Manage.vue'
import Settings from './components/Settings.vue'

export default {
  created: function () {
    this.syncStorageDown()
  },

  components: {
    AppMenu,
    List,
    Onboarding,
    AddFolder,
    Manage,
    Settings
  },

  computed: {
  },

  data () {
    return {
      storeCache: {
        lists: {}
      },
      onboarding: false,
      windowOpen: false,
      viewActive: ''
    }
  },

  methods: {
    syncStorageDown: function () {
      let vm = this
      chrome.storage.local.get(null, function(items) {
        vm.storeCache = items

        if (!vm.storeCache.lists || Object.keys(vm.storeCache.lists).length === 0) {
          vm.onboarding = true
        }
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

      this.syncStorageUp()
      this.onboarding = false
      this.windowOpen = !this.windowOpen
    },
    deleteList: function (id) {
      Vue.delete(this.storeCache.lists, id)

      if (!this.storeCache.lists || Object.keys(this.storeCache.lists).length === 0) {
        this.onboarding = true
      }

      this.syncStorageUp()
    },
    resetData: function () {
      chrome.storage.local.clear()
      this.syncStorageDown()
      this.windowToggle()
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