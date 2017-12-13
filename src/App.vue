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
                                         :key="index">
                                         <list :list-data="list">
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
import AppMenu from './components/AppMenu.vue'
import List from './components/List.vue'

import NoContent from './components/NoContent.vue'
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
    NoContent,
    AddFolder,
    Manage,
    Settings
  },

  computed: {
    hasContent: function () {
      if (this.initialized) {
        if (!this.storeCache.lists) {
          return false
        } else if (this.storeCache.lists) {
          return true
        }
      } else {
        return true
      }
    }
  },

  data () {
    return {
      storeCache: {
        lists: null
      },
      windowOpen: false,
      viewActive: '',
      initialized: false
    }
  },

  methods: {
    syncStorageDown: function () {
      let vm = this
      chrome.storage.local.get(null, function(items) {
        vm.storeCache = items
        vm.initialized = true
        console.log(vm.storeCache)
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
      this.storeCache.lists[id] = obj
      console.log(this.storeCache.lists)
      this.windowOpen = !this.windowOpen
      this.syncStorageUp()
    },
    handleMenuClick: function (id) {
      this.viewActive = id
    },
    windowToggle: function () {
      this.windowOpen = !this.windowOpen
      this.viewActive = ''
    }
  }
}
</script>