<template>
  <div class="col">
    <a v-for="link in links"
       :href="link.url">
       {{link.title}}
    </a>
  </div>
</template>

<script>
import { UiSelect } from 'keen-ui';

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