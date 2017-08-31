<template lang="pug">
  div.main-page 
    side-bar
    main-content
    editor(v-if="editModeIsActive")
</template>

<script>
import SideBar from '@/components/MainPage/SideBar'
import MainContent from '@/components/MainPage/MainContent'
import Editor from '@/components/MainPage/Editor'

export default {
  name: 'main-page',
  components: {
    SideBar,
    MainContent,
    Editor
  },
  data () {
    return {
      editModeIsActive: true
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
