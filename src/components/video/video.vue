<template>
  <div>
    
    <div @click="backToHome" id="closer">CLOSE</div>
    <div id="talent"><span>TALENT</span> {{ activeVideo.name }}</div>

    <div class="video-container">
        <div class='vimeo-container'><iframe src='' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>
    </div>

    <h2 class="video-name">{{ activeVideo && activeVideo.client }}</h2>
    <h4 class="video-description">{{ activeVideo && activeVideo.desc }}</h4>

  </div>    
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router'
  
export default {
  computed: {
    activeVideo () {
      const vid = this.$store.getters.activeVideo
      return vid ? vid : {name: 'Anthony Leonardi', image: 'Danny', client: 'AARP', desc: 'Danny Trejo Explains Why Caregivers Are the Ultimate Warriors.', vimeo: '67787125'}
    },
    vimeoIframeUrl (){
      return `https://player.vimeo.com/video/${this.activeVideo.vimeo}?autoplay=1&byline=0&portrait=0&title=0&transparent=1`
    }
  },
  created () {
    if (!this.activeVideo) router.push('/?error=no-video')

    window.setTimeout(() => $('.vimeo-container iframe').attr('src', this.vimeoIframeUrl), 100)
  },
  methods: {
    backToHome(e) {
      this.$store.dispatch('unsetActiveVideo')
      router.push('/')
    }
  }
}
</script>

<style lang="scss">
    $font-color-secondary: #7d765a;

    .video-container {
        width: 100%;
        max-width: 1400px;
        margin: 20px auto 30px;
        padding: 0 80px;
    }
    .vimeo-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      height: auto;
    }
    .vimeo-container iframe, .vimeo-container object, .vimeo-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .video-name {
        font-size: 3.5rem;
        text-align: center;
    }
    .video-description {
        font-size: 2rem;
        color: $font-color-secondary;
        text-align: center;
        margin-top: 12px;
    }
    #closer, #talent {
        font-family: 'FranklinGothic', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        -webkit-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
        position: absolute;
        left: -70px;
        top: 40%;
    }
    #talent span {
        color: $font-color-secondary;
    }
    #closer {
        left: auto;
        right: 0;
        top: 37%;
        cursor: pointer;
    }

    @media (max-width: 850px) {
      .video-name {font-size:3.5rem}
      .video-description {font-size:1.75rem}
      #talent {top:36%}
      #closer {top:35%}
    }
    @media (max-width: 775px) {
      #talent {top:34%}
      #closer {top:32%}
    }
    @media (max-width: 700px) {
      .video-name {font-size:3rem}
      .video-description {font-size:1.5rem}
      #talent {top:32%}
      #closer {top:30%}
      margin-top:11px;
    }
    @media (max-width: 625px) {
      #talent {top:30%}
      #closer {top:28%}
    }
    @media (max-width: 550px) {
      .video-name {font-size:2.5rem}
      .video-description {font-size:1.25rem}
      #talent {top:28%}
      #closer {top:26%}
    }
    @media (max-width: 475px) {
      #talent {top:26%}
      #closer {top:25%}
    }
    @media (max-width: 400px) {
      .video-name {font-size:2rem}
      .video-description {font-size:1rem}
      #talent {top:24%}
      #closer {top:23%}
      margin-top:10px;
    }
</style>
