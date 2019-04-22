<template>
  <div id="apps">
    <app-header />
    <section id="content" class="container">
      <router-view :key="$route.fullPath"></router-view>
    </section>
    <app-footer />
  </div>
</template>

<script>
  import Header from './components/nav/nav.vue';
  import Footer from './components/footer/footer.vue';

  export default {
    name: 'apps',
    components: {
      'app-header': Header,
      'app-footer': Footer
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch('isHomepage')
        $('body').removeClass('nav-wrap-is-visible')
      }
    }
  }
</script>