export default {
  state: {
    editModeIsActive: false,
    editModalIsActive: false,
    userIsLoggedIn: false
  },
  mutations: {
    toggleEditMode (state) {
      state.editModeIsActive = !state.editModeIsActive
    },
    setEditMode (state, {newState}) {
      state.editModeIsActive = newState
    },
    toggleEditModal (state) {
      state.editModalIsActive = !state.editModalIsActive
    },
    setEditModal (state, {newState}) {
      state.editModalIsActive = newState
    },
    setLoginStatus (state, {status}) {
      state.userIsLoggedIn = status
    }
  },
  getters: {
  },
  actions: {
  }
}
