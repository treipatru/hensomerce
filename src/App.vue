<template>
  <div id="hensomerce">
    
    <div id="content" class="grid">
      <list v-for="item in lists"
            :key="item.id"
            :book-id="item.bookId">
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

      let list = {
        [vm.counter]: {
          listIndex: vm.counter,
          bookId: 0,
          title: ''
        }
      }
      this.saveData(list)
    },
    saveData: function (obj) {
      let vm = this
      let p = obj

      chrome.storage.local.set(obj, function() {
        console.log('success')
        vm.incrementCounter()
        vm.lists.push(p)
      });

    },
    updateFromStorage: function () {
      let vm = this

      chrome.storage.local.get(null, function(items) {
        let allKeys = Object(items);

        let arr = Object.values(allKeys);

        if (arr.length === 0) {
          console.log('Show onboarding')
        } else {
          vm.lists = arr
        }
      })
    },
    setCounter: function () {
      let vm = this
      chrome.storage.local.get('indexCounter', function(res) {
        if (vm.isEmpty(res)) {
          chrome.storage.local.set({'indexCounter': 0})
          vm.counter = 0
        } else {
          vm.counter = res.indexCounter
        }
      })
    },
    incrementCounter: function () {
      let vm = this
      vm.counter++
      chrome.storage.local.set({'indexCounter': vm.counter})
    }
  },

  mounted: function () {
  }
}
</script>