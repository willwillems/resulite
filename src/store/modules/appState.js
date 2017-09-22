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
      state.editModeIsActive = !state.editModeIsActive
    },
    setEditModal (state, {newState}) {
      state.editModeIsActive = newState
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
