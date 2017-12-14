<template>
    <div class="list">
      <div class="list-header">
        <p>{{this.listData.name}}</p>
        <i class="material-icons close"
           @click="deleteList">
           &#xE5CD;
        </i>
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
  import CloseIcon from '../svg/menu.svg'
export default {
  components: {
    CloseIcon
  },
  data () {
    return {
    }
  },

  methods: {
    deleteList: function () {
      this.$emit('deleteList', this.listData.id)
    }
  },

  props: [
    'listData'
  ]
}
</script>