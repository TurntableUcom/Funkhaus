<template>
  <header>

    <div id="logout" v-if="isAdmin">
      <span @click="logout">LOGOUT</span>
    </div>

    <div class="header-logo">
        <img @click="logoClick" src="/assets/images/bullitt-logo.gif" alt="Bullit logo" />
    </div>

    <a class="header-toggle-menu" href="#0" title="Menu">
      <span>Menu</span>
    </a>
    <nav class="header-nav-wrap">
      <h2 class="header-nav-heading">Site Navigation</h2>
      <ul class="header-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/video">Video</router-link>
        </li>
      </ul>
      <a title="Close Menu" class="header-overlay-close close-mobile-menu">Close</a>
    </nav>
      
  </header>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router'
  
export default {
  methods: {
    logoClick() {
      this.$store.dispatch('unsetActiveVideo')
      router.push('/')
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.loggedInAsAdmin
    }
  }
}
</script>

<style lang="scss">
  header {
    padding: 20px;
    display: flex;
    justify-content: center;

    .header-logo {
      width: 162px;
      margin: 0 auto;
      display: block;
      cursor: pointer;

      @media (max-width: 850px) {
        width:135px;
      }

      img {
        width:162px; height:36px;
        border:0;

        @media (max-width: 850px) {
          width:135px; height:30px;
        }
      }
    }

    #logout {
      position:absolute;
      left: 30px;
      top: 30px;
      cursor: pointer;

      a {
        color: white;
        text-decoration: none;
      }
    }

    .header-toggle-menu {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 20px;
      top: 12px;
    }

    .header-toggle-menu span {
      display: block;
      width: 22px;
      height: 2px;
      margin-top: -1px;
      position: absolute;
      right: 9px;
      top: 50%;
      bottom: auto;
      left: auto;
      background-color: white;
      -webkit-transition: background 0.2s ease-in-out;
      transition: background 0.2s ease-in-out;
      text-shadow: none;
      color: transparent;
    }

    .header-toggle-menu span::before, .header-toggle-menu span::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: inherit;
      left: 0;
    }

    .header-toggle-menu span::before {
      top: -8px;
    }

    .header-toggle-menu span::after {
      bottom: -8px;
    }

    .header-nav-wrap {
      opacity: 0;
      visibility: hidden;
      position: fixed;
      top: 0;
      width: 100%;

      .header-nav-heading {
        text-align: center;
        font-size: 1.4rem;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: .3rem;
        margin-top: 6rem;
      }
    }

    @media only screen and (min-width:801px) {
      .header-nav li ul {
          display: block !important;
      }
    }
  }

  body.nav-wrap-is-visible header {
    .header-nav-wrap {
      background-color: #151515;
      opacity: 1;
      visibility: visible;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-transition: all 0.3s linear;
      transition: all 0.3s linear;
      margin: 0;
      border: none;
      z-index: 600;
      overflow-y: auto;

      .header-nav-heading {
        display: block;
      }

      .close-mobile-menu {
        display: block;
        cursor: pointer;
      }

      .header-overlay-close {
        position: absolute;
        display: block;
        width: 45px;
        height: 45px;
        top: 21px;
        left: 50%;
        margin-left: -23px;
        text-shadow: none;
        color: transparent;
      }

      .header-overlay-close::before, .header-overlay-close::after {
        content: '';
        position: absolute;
        display: inline-block;
        width: 2px;
        height: 20px;
        top: 12px;
        left: 22px;
        background-color: #FFFFFF;
      }

      .header-overlay-close::before {
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      .header-overlay-close::after {
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }

    .header-nav {
      margin: 4.8rem auto 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      font-family: "FranklinGothic", sans-serif;
      font-size: 16px;
      max-width: 800px;

      @media only screen and (max-width:400px) {
        margin: 4.2rem 4.2rem 3rem 4.2rem;
      }

      li {
        border-top: 1px solid rgba(255, 255, 255, 0.03);
      }

      li a {
        line-height: 54px;
        color: white;
        text-decoration: none;
        margin-left:20px
      }
    }
  }
</style>
