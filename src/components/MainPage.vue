<template lang="pug">
  div.main-page 
    side-bar
    main-content
    editor(v-if="userIsLoggedIn")
    edit-modal(v-if="editModalIsActive")
</template>

<script>
import { mapState } from 'vuex'

import SideBar from '@/components/MainPage/SideBar'
import MainContent from '@/components/MainPage/MainContent'
import Editor from '@/components/MainPage/Editor'
import EditModal from '@/components/MainPage/EditModal'

export default {
  name: 'main-page',
  components: {
    SideBar,
    MainContent,
    Editor,
    EditModal
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      editModeIsActive: state => state.appState.editModeIsActive,
      editModalIsActive: state => state.appState.editModalIsActive,
      userIsLoggedIn: state => state.appState.userIsLoggedIn
    })
  },
  methods: {
    toggleModal () {
      this.$store.commit('toggleEditModal')
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
