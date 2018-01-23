<template>
  <div
    id="hensomerce"
    v-bind:class="{active: windowOpen}"
  >

    <menu-button
      v-on:emitButtonClick="handleMenuClick"
      v-on:windowToggle="windowToggle"
      :window-open="windowOpen"
      :view-active="viewActive"
      :onboarding="onboarding"
    >
    </menu-button>

    <div v-bind:class="['content']">

        <transition-group name="fade" mode="out-in">
          <!-- Render page content -->
          <div
            v-show="!windowOpen"
            :key="0"
            id="content-window"
          >
            <transition-group name="fade" mode="out-in">
              <onboarding
                v-if="onboarding && !windowOpen"
                :key="2"
              >
              </onboarding>

              <div
                v-if="!onboarding && !windowOpen"
                :key="3"
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
                  v-packery-item
                  v-bind:class="cardClass"
                  :ref="list.id"
                  :key="index"
                >
                  <list
                    :list-data="list"
                    v-on:deleteList="deleteList"
                  >
                  </list>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- Render action window -->
          <div
            v-if="windowOpen"
            id="action-window"
            :key="1"
          >
            <app-menu
              v-on:emitButtonClick="handleMenuClick"
              :view-active="viewActive"
            >
            </app-menu>
            <transition-group name="slide" mode="out-in">
              <add-folder
                v-if="viewActive === 'add'"
                :key="4"
                :lists="storeCache.lists"
                v-on:saveList="saveList"
                v-on:cancelSelection="windowOpen = !windowOpen"
              >
              </add-folder>
              <settings
                v-if="viewActive === 'settings'"
                :key="5"
                :optionsInput="storeCache.options"
                v-on:resetData="resetData"
                v-on:saveOptions="saveOptions"
              >
              </settings>
            </transition-group>
          </div>
        </transition-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MenuButton from './components/MenuButton.vue'
import AppMenu from './components/AppMenu.vue'
import List from './components/List.vue'

import Onboarding from './components/Onboarding.vue'
import AddFolder from './components/AddFolder.vue'
import Settings from './components/Settings.vue'

export default {
  created: function () {
    this.syncStorageDown()
  },

  components: {
    MenuButton,
    AppMenu,
    List,
    Onboarding,
    AddFolder,
    Settings
  },

  computed: {
    cardClass: function () {
      let userCol = 'col-' + this.storeCache.options.columns
      return ['card', userCol]
    }
  },

  data () {
    return {
      storeCache: {
        lists: {},
        options: {}
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

        if (!vm.storeCache.lists) {
          vm.storeCache.lists = {}
        }

        if (!vm.storeCache.options) {
          vm.storeCache.options = {
            columns: '3',
            theme: 'light'
          }
        }
        document.body.classList = vm.storeCache.options.theme
      })
    },

    syncStorageUp: function () {
      let vm = this
      chrome.storage.local.clear()
      chrome.storage.local.set(vm.storeCache, function() {
      })
    },

    saveList: function (obj) {
      let vm = this

      if (!vm.storeCache.lists) {
        vm.storeCache.lists = {}
      }

      Object.keys(obj).forEach(function(key) {
        Vue.set(vm.storeCache.lists, obj[key].id, obj[key])
      })

      this.syncStorageUp()
      this.onboarding = false
      this.windowOpen = !this.windowOpen
    },

    deleteList: function (id) {
      this.$refs.cardsContainer.packery.remove(this.$refs[id])
      this.$refs.cardsContainer.packery.layout()
      Vue.delete(this.storeCache.lists, id)

      if (!this.storeCache.lists || Object.keys(this.storeCache.lists).length === 0) {
        this.onboarding = true
      }

      this.syncStorageUp()
    },

    deleteLink: function (id, parentId) {
      Vue.delete(this.storeCache.lists[parentId].links, id)
      this.syncStorageUp()
    },

    addLink: function (id, parentId) {
      let vm = this
      chrome.bookmarks.get(id, function (res) {
        let o = {
          title: res[0].title,
          url: res[0].url
        }
        Vue.set(vm.storeCache.lists[parentId].links, id, o)
        vm.syncStorageUp()
      })
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
    },

    saveOptions: function (obj) {
      let vm = this
      Object.keys(obj).forEach(function(key) {
        Vue.set(vm.storeCache.options, key, obj[key])
      })
      this.syncStorageUp()
      setTimeout(function(){
        location.reload()
        }, 230)
    },

    handleKeyPress: function (e) {
      if (e.keyCode === 27) {
        this.windowToggle()
      }
    }
  },
  mounted: function () {
    let vm = this

    window.addEventListener('keydown', vm.handleKeyPress, false)

    chrome.bookmarks.onCreated.addListener(function(id, obj) {
      if (vm.storeCache.lists[obj.parentId]) {
        vm.addLink(id, obj.parentId)
      }
    })

    chrome.bookmarks.onRemoved.addListener(function(id, obj) {
      if (vm.storeCache.lists[obj.parentId]) {
        vm.deleteLink(id, obj.parentId)
      } else if (vm.storeCache.lists[id]) {
        vm.deleteList(id)
      }
    })

    chrome.bookmarks.onChanged.addListener(function(id, obj) {
      chrome.bookmarks.get(id, function(res) {
        let p = res[0].parentId

        // If parent is in the grid
        if (vm.storeCache.lists[p]) {
          vm.storeCache.lists[p].links[id].title = obj.title
          vm.storeCache.lists[p].links[id].url = obj.url
        }
        // If obj is a folder in the grid
        if (vm.storeCache.lists[id]) {
          vm.storeCache.lists[id].name = obj.title
        }

        vm.syncStorageUp()
      })
    })

    chrome.bookmarks.onMoved.addListener(function(id, obj) {
      // Handle move links between parents in the grid
      if (vm.storeCache.lists[obj.oldParentId] &&
          vm.storeCache.lists[obj.parentId] &&
          obj.parentId !== obj.oldParentId) {
        vm.deleteLink(id, obj.oldParentId)
        vm.addLink(id, obj.parentId)
      }
      // Move from grid parent to outside of grid
      if (vm.storeCache.lists[obj.oldParentId] && !vm.storeCache.lists[obj.parentId]) {
        vm.deleteLink(id, obj.oldParentId)
      }
      // Move from outside of grid parent to grid parent
      if (vm.storeCache.lists[obj.parentId] && !vm.storeCache.lists[obj.oldParentId]) {
        vm.addLink(id, obj.parentId)
      }
    })
  }
}
</script>