<template>
    <div @click="loadVideo" class="videoGrid-item">
        <img :src="imgSrc" :srcset="imgSrcset" alt="" />
        <span>{{ itemName }}</span>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Vuex from 'vuex'
  import router from '../../router'

  export default {
    props: {
      itemName: String,
      itemImage: String,
      itemClient: String,
      itemDesc: String,
      itemVimeo: String,
      lastElt: Boolean
    },
    data () {
      return {
        vidObj: {
          name: this.itemName,
          image: this.itemImage,
          client: this.itemClient,
          desc: this.itemDesc,
          vimeo: this.itemVimeo
        }
      }
    },
    methods: {
      loadVideo(e) {
        this.$store.dispatch('setActiveVideo', this.vidObj)
        router.push('/video')
      }
    },
    computed: {
      imgSrc (imgBase) {
        return '../../assets/images/cap-' + this.itemImage + '-800x421.jpg'
      },
      imgSrcset (imgBase) {
        return '../../assets/images/cap-' + this.itemImage + '-800x422.jpg 800w, ../../assets/images/cap-' + this.itemImage + '-1600x843.jpg 1600w'
      }
    }
  }
</script>
