<template>
  <div id="hensomerce">
    
    <div id="content" class="grid">
      <list v-for="(item, index) in lists"
            :key="index"
            :list-index="index">
      </list>
    </div>

    <add-button v-on:createList="createList">
    </add-button>

  </div>
</template>

<script>
import AddButton from './components/AddButton.vue'
import List from './components/List.vue'

export default {
  created: function () {
    this.setCounter()
    this.updateFromStorage()
  },

  components: {
    List,
    AddButton,
  },

  data () {
    return {
      counter: 0,
      noLists: true,
      lists: []
    }
  },

  methods: {
    isEmpty: function (obj) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false
      }
      return true
    },
    createList: function () {
      let vm = this

      chrome.storage.local.set({ ['listIndex'+vm.counter]: 0}, function() {
        vm.incrementCounter()
        vm.updateFromStorage()
      })
    },
    updateFromStorage: function () {
      let vm = this

      chrome.storage.local.get(null, function(items) {
        let allKeys = Object(items);

        let arr = Object.values(allKeys);

        if (arr.length === 0) {
          console.log('Show onboarding')
        } else {
          //Remove indexCounter from list of folders
          arr.splice(0, 1)
          vm.lists = arr
        }
      })
    },
    setCounter: function () {
      let vm = this
      chrome.storage.local.get('indexCounter', function(res) {
        if (res.indexCounter === 0) {
          chrome.storage.local.set({'indexCounter': 0})
          vm.counter = 0
        } else if (res.indexCounter > 0) {
          vm.counter = res.indexCounter
        }
      })
    },
    incrementCounter: function () {
      let vm = this
      vm.counter++
      chrome.storage.local.set({'indexCounter': vm.counter})
    }
  }
}
</script>