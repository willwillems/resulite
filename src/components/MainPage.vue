<template lang="pug">
  div
    div.main-page(v-if="userPathIsValid")
      side-bar
      main-content
      editor(v-if="userIsLoggedIn")
      edit-modal(v-if="editModalIsActive")
      save-button(v-if="editModeIsActive && changesMade")
    div(v-else)
     .user-not-found-container
        .user-not-found
          h1 Sorry user not found
          span but you can register an account <a href="/">here</a>.
</template>

<script>
import { mapState } from 'vuex'

import SideBar from '@/components/MainPage/SideBar'
import MainContent from '@/components/MainPage/MainContent'
import Editor from '@/components/MainPage/Editor'
import EditModal from '@/components/MainPage/EditModal'
import SaveButton from '@/components/MainPage/SaveButton'

export default {
  name: 'main-page',
  components: {
    SideBar,
    MainContent,
    Editor,
    EditModal,
    SaveButton
  },
  data () {
    return {
    }
  },
  computed: {
    userPathIsValid () {
      // this needs some... ehh.. work
      return this.$store.state.appState.userPath
    },
    ...mapState({
      editModeIsActive: state => state.appState.editModeIsActive,
      editModalIsActive: state => state.appState.editModalIsActive,
      userIsLoggedIn: state => state.appState.userIsLoggedIn,
      changesMade: state => (Object.keys(state.appState.scheduledChanges).length !== 0)
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
