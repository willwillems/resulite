<template>
  <div id="app">
    <main>
      <!-- Yes this is a very dubious approach... -->
      <router-view v-if="userSubdomain"></router-view>
      <landing-page v-else></landing-page>
    </main>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage'

export default {
  name: 'app',
  components: {
    LandingPage
  },
  computed: {
    userSubdomain () {
      return this.$store.state.appState.userPath || this.$store.state.appState.userPath === 'www'
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: left;
}
</style>
