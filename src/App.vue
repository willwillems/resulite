<template>
  <div id="app">
    <main>
      <router-view v-if="$root.user.displayName"></router-view>
      <div v-else class="user-not-found-container">
        <div class="user-not-found">
          <h1>Sorry user not found </h1>
          <span> but you can register an account <a href="/"> here </a> </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
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

.user-not-found-container {
  position: relative;
  height: 80vh;
}

.user-not-found {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
