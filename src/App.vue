<template>
  <div id="app">
    <main>
      <router-view v-if="true"></router-view>
      <landing-page v-else-if="false"></landing-page>
    </main>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage'

export default {
  name: 'app',
  components: {
    LandingPage
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
