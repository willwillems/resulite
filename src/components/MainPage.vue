<template lang="pug">
  div.main-page 
    side-bar
    main-content
</template>

<script>
import SideBar from '@/components/MainPage/SideBar'
import MainContent from '@/components/MainPage/MainContent'

export default {
  name: 'hello',
  components: {
    SideBar,
    MainContent
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      user: {
        name: 'Rutger Willems',
        shortBio: 'I am a work in progress'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .main-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 40px;
  }
</style>
