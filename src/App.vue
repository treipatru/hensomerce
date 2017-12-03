<template>
  <div id="hensomerce" :class="windowOpen ? 'active' : ''">

    <app-menu v-on:emitButtonClick="handleMenuClick"
              v-on:windowToggle="windowToggle"
              :window-open="windowOpen">
    </app-menu>

    <div class="content">
      <transition name="fade" mode="out-in">

        <!-- Render page content -->
        <div  v-bind:class="[ 'grid-center', 'grid-3_sm-2']"
              :key="1"
              v-if="!windowOpen">
              
              <list v-for="(list, index) in storeCache.lists"
                    :list-data="list"
                    :key="index">
              </list>
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
    AddFolder,
    Manage,
    Settings
  },

  data () {
    return {
      storeCache: {},
      windowOpen: false,
      lists: [],
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
      id === this.viewActive ? this.viewActive = '' : this.viewActive = id
    },
    windowToggle: function () {
      this.windowOpen = !this.windowOpen
      this.viewActive = ''
    }
  }
}
</script>