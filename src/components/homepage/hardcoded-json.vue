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

import VideoGridItem from './list-item.vue'
  
export default {
  data () {
      return {
        videos: [
          {name: 'Anderson Wright', image: 'Treeboy', client: 'Monarch of Planet X', desc: 'Groot is a fictional superhero appearing in American comic books.', vimeo: '278616484'},
          {name: 'Anthony Leonardi', image: 'Danny', client: 'AARP', desc: 'Danny Trejo Explains Why Caregivers Are the Ultimate Warriors.', vimeo: '67787125'},
          {name: 'Candice Vernon', image: 'Basketball', client: 'Nike', desc: 'Scientifically proven to give you big ups.', vimeo: '83772438'},
          {name: 'Drake Doremus', image: 'Spock', client: 'Star Trek', desc: 'Critical reaction to Spock\'s death was mixed', vimeo: '59093993'},
          {name: 'Justin Lin', image: 'Closeup', client: 'Closeup', desc: 'A close-up is a type of shot that tightly frames a person or object.', vimeo: '23864906'},
          {name: 'Larry Charles', image: 'Figure-Skater', client: 'Figure Skating Assoc. of America', desc: 'Quad Skates', vimeo: '56846607'},
          {name: 'Matt Ogens', image: 'Locker-Room', client: 'Gatorade', desc: 'Recent spot I worked on for Gatorade, edited by Shane Reid at Whitehouse.', vimeo: '104749571'},
          {name: 'Christina Burchard', image: 'Boxer', client: 'Why We Fight', desc: 'Why We Fight follows a charismatic young prizefighter named Zac Wohlman.', vimeo: '264377906'}
        ]
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