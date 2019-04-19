<template>
  <div>
    <h1 class="pageHeader">Talent</h1>

    <div class="videoGrid">
      
      <div class="videoGrid-row">
        <div @click="loadVideo" data-vid="0" class="videoGrid-item">
            <img src="../../assets/images/cap-Treeboy-800x422.jpg" srcset="../../assets/images/cap-Treeboy-800x422.jpg 800w, ../../assets/images/cap-Treeboy-1600x843.jpg 1600w" alt="">
            <span>Anderson Wright</span>
        </div>
        <div @click="loadVideo" data-vid="1" class="videoGrid-item">
            <img src="../../assets/images/cap-Danny-800x422.jpg" srcset="../../assets/images/cap-Danny-800x422.jpg 800w, ../../assets/images/cap-Danny-1600x843.jpg 1600w" alt="">
            <span>Anthony Leonardi</span>
        </div>
      </div>

      <div class="videoGrid-row">
        <div @click="loadVideo" data-vid="2" class="videoGrid-item">
            <img src="../../assets/images/cap-Basketball-800x422.jpg" srcset="../../assets/images/cap-Basketball-800x422.jpg 800w, ../../assets/images/cap-Basketball-1600x843.jpg 1600w" alt="">
            <span>Candice Vernon</span>
        </div>
        <div @click="loadVideo" data-vid="3" class="videoGrid-item">
            <img src="../../assets/images/cap-Spock-800x422.jpg" srcset="../../assets/images/cap-Spock-800x422.jpg 800w, ../../assets/images/cap-Spock-1600x843.jpg 1600w" alt="">
            <span>Drake Doremus</span>
        </div>
      </div>

      <div class="videoGrid-row">
        <div @click="loadVideo" data-vid="4" class="videoGrid-item">
            <img src="../../assets/images/cap-Closeup-800x422.jpg" srcset="../../assets/images/cap-Closeup-800x422.jpg 800w, ../../assets/images/cap-Closeup-1600x843.jpg 1600w" alt="">
            <span>Justin Lin</span>
        </div>
        <div @click="loadVideo" data-vid="5" class="videoGrid-item">
            <img src="../../assets/images/cap-Figure-Skater-800x422.jpg" srcset="../../assets/images/cap-Figure-Skater-800x422.jpg 800w, ../../assets/images/cap-Figure-Skater-1600x843.jpg 1600w" alt="">
            <span>Larry Charles</span>
        </div>
      </div>

      <div class="videoGrid-row">
        <div @click="loadVideo" data-vid="6" class="videoGrid-item">
            <img src="../../assets/images/cap-Locker-Room-800x422.jpg" srcset="../../assets/images/cap-Locker-Room-800x422.jpg 800w, ../../assets/images/cap-Locker-Room-1600x843.jpg 1600w" alt="">
            <span>Matt Ogens</span>
        </div>
        <div @click="loadVideo" data-vid="7" class="videoGrid-item">
            <img src="../../assets/images/cap-Boxer-800x422.jpg" srcset="../../assets/images/cap-Boxer-800x422.jpg 800w, ../../assets/images/cap-Boxer-1600x843.jpg 1600w" alt="">
            <span>Peyton Wilson</span>
        </div>
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
          {name: 'James Gandolfini', image: 'Treeboy', client: 'Monarch of Planet X', desc: 'Groot is a fictional superhero appearing in American comic books.', vimeo: '278616484'},
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
    loadVideo(e) {
      let clicked = $(e.target);
      let elt = clicked.hasClass('.videoGrid-item') ? clicked : clicked.parents('.videoGrid-item');
      let vid = $(elt).data('vid')
      this.$store.dispatch('setActiveVideo', this.videos[vid])
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
