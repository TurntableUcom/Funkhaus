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

<style lang="scss">
  .videoGrid {
    padding :0;
    margin: 0;

    .videoGrid-row {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      &:after {
        content: "";
        display: table;
        clear: both;
      }

      .videoGrid-item {
        width: 50%;
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1 0 50%;
        justify-content: center;
        cursor: pointer;

        @media (max-width: 680px) {
          width: 100%;
        }

        img {
          object-fit: cover;
          width: 100%;
          max-height: 100%;
        }

        span {
          font-family: 'GTSuper-Medium', 'Times New Roman', Times, serif;
          position: absolute;
          width:100%;
          text-align: center;
          font-size: 3rem;
          text-shadow: 1px 1px 1px #000;

          @media (max-width: 850px) {
            font-size: 2.5rem;
          }
          @media (max-width: 700px) {
            font-size: 2rem;
          }
          @media (max-width: 550px) {
            font-size: 1.5rem;
          }
          @media (max-width: 400px) {
            font-size: 1.1rem;
          }
        }
      }
    }
  }
</style>
