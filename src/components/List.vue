<template>
  <div class="col">
    <div class="list">
      <ul>
        <li v-for="link in links">
          <a :href="link.url">
            <img :src="'chrome://favicon/' + link.url"
           :alt="link.title">
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