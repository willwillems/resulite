// import c from '@/script/constants'

export default {
  state: {
    editModeIsActive: false,
    editModalIsActive: false,
    editModalContentKey: '',
    editModalEntryKey: '',
    editModalTypeIsText: true,
    userPath: '',
    userIsLoggedIn: false
  },
  mutations: {
    setUserPath (state, {path}) {
      state.userPath = path
    },
    toggleEditMode (state) {
      state.editModeIsActive = !state.editModeIsActive
    },
    setEditMode (state, {newState}) {
      state.editModeIsActive = newState
    },
    toggleEditModal (state) {
      state.editModalIsActive = !state.editModalIsActive
    },
    setEditModal (state, {newState, postKey, entryKey}) {
      state.editModalIsActive = newState
      state.editModalTypeIsText = !entryKey
      state.editModalContentKey = postKey
      state.editModalEntryKey = entryKey || ''
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
