<template>
  <div id="hensomerce" :class="windowOpen ? 'active' : ''">

    <app-menu v-on:emitButtonClick="handleMenuClick"
              v-on:windowToggle="windowToggle"
              :window-open="windowOpen"
              :view-active="viewActive">
    </app-menu>

    <div v-bind:class="['content', {'active' : viewActive}]">
      <transition name="fade" mode="out-in">

        <!-- Render page content -->
        <div :key="1"
             v-if="!windowOpen">
              <transition name="fade"
                          mode="out-in">
                <div v-bind:class="['grid-center-column-middle']"
                     v-if="!hasContent"
                     :key="1">
                  <no-content>
                  </no-content>
                </div>

                <div v-bind:class="[ 'grid-center', 'grid-4_sm-2_md-3']"
                     v-if="hasContent"
                     :key="2">
                  <list v-for="(list, index) in storeCache.lists"
                      :list-data="list"
                      :key="index">
                  </list>
                </div>

            </transition>
        </div>

        <!-- Render action window -->
        <div id="action-window"
             :key="2"
             v-if="windowOpen">
             <transition name="fade" mode="out-in">

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
      </transition>

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
      if (this.lists.length === 0) {
        return false
      } else if (this.lists.length > 0) {
        return true
      }
    },
    lists: function () {
      return this.storeCache.lists || []
    }
  },

  data () {
    return {
      storeCache: {},
      windowOpen: false,
      viewActive: ''
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
    saveList: function (obj) {
      if (!this.storeCache.lists) {
        this.storeCache.lists = []
      }
      this.storeCache.lists.push(obj)
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