<template>
    <div class="list">
      <div v-bind:class="['header', this.listData.color]">
        <p @click="changeColor">{{this.listData.name}}</p>
        <i
          class="material-icons close"
          @click="deleteList"
        >
          <CloseIcon class="close-icon"/>
        </i>
      </div>
      <ul>
        <li
          v-for="(link, index) in listData.links"
          :key="index"
        >
          <a
            :href="link.url"
            :title="link.url"
          >
            <img :src="'chrome://favicon/' + link.url">
           <span>{{link.title}}</span>
           </a>
        </li>
      </ul>
    </div>
</template>

<script>
  import CloseIcon from '../svg/ic_close_black_24px.svg'

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
      },
      changeColor: function () {
        this.$emit('updateHeaderColor', this.listData.id)
      }
    },

    props: [
      'listData'
    ]
  }
</script>