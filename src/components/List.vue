<template>
  <div class="col">
    <div class="list">
      <div class="list-header">
        <p>{{folderName}}</p>
      </div>
      <ul>
        <li v-for="link in links">
          <a :href="link.url"
             :title="link.url">
            <img :src="'chrome://favicon/' + link.url"
           :alt="link.title">
           <span>{{link.title}}</span>
           </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { UiSelect } from 'keen-ui'

export default {
  created: function () {
    let listName = Object.keys(this.listData)[0]
    this.links = this.listData[listName]
  },
  components: {
  },

  data () {
    return {
      folderName: Object.keys(this.listData)[0],
      links : []
    }
  },

  methods: {
  },

  props: [
    'listData'
  ]
}
</script>