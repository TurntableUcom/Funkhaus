<template>
  <div>
    <h1 class="pageHeader">Talent</h1>
    <div class="videoGrid">
      <div class="videoGrid-row">
        <video-grid-item v-for="(item, index) in videos" @click="loadVideo(item)" v-bind:key="item.name" :itemName="item.name" :itemImage="item.image" :itemClient="item.client" :itemDesc="item.desc" :itemVimeo="item.vimeo" :lastElt="index % 2 == 0 ? false : true" />
      </div>
    </div>
  </div>    
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router'
import { db } from '../../firebase'
import VideoGridItem from './list-item.vue'
  
export default {
  data () {
    return {
      videos: []
    }
  },
  firebase: {
    vids: {
      source: db.ref('entries'),
      readyCallback(snapshot) {
        this.videos = this.vids
      },
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods: {
    loadVideo(vid) {
      this.$store.dispatch('setActiveVideo', vid)
      router.push('/video')
    }
  },
  components: {
    'videoGridItem': VideoGridItem
  }
}
</script>
