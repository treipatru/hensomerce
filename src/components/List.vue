<template>
    <div class="list">
      <div class="list-header">
        <p>{{this.listData.name}}</p>
      </div>
      <ul>
        <li v-for="link in listData.links">
          <a :href="link.url"
             :title="link.url">
            <img :src="'chrome://favicon/' + link.url">
           <span>{{link.title}}</span>
           </a>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
  },

  props: [
    'listData'
  ]
}
</script>