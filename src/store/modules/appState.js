import fb from '@/script/firebase'
import c from '@/script/constants'

// Firebase DB
const db = fb.database()

export default {
  state: {
    editModeIsActive: false,
    editModalIsActive: false,
    editModalContentKey: '',
    editModalEntryKey: '',
    editModalTypeIsText: true,
    userPath: '',
    uid: '',
    userIsLoggedIn: false,
    scheduledChanges: {}
  },
  mutations: {
    setUserPath (state, {path}) {
      state.userPath = path
    },
    setUID (state, {uid}) {
      state.uid = uid
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
    },
    scheduleChange (state, {path, newVal}) {
      // this should remove attr if there are changed back to original
      // This might look akward but cannot set prop direct cuz not reactive
      state.scheduledChanges = {
        ...state.scheduledChanges,
        [`${c.DB_ROOT_USER_PATH}/${state.userPath}/${c.DB_PAGEDATA}/${path}`]: newVal
      }
    },
    clearScheduledChanges (state) {
      state.scheduledChanges = {}
    }
  },
  getters: {
  },
  actions: {
    saveChanges ({ state, commit }) {
      const changes = state.scheduledChanges
      let promises = []
      Object.keys(changes).forEach(key => {
        promises.push(
          db.ref(`${key}`)
            .set(changes[key])
        )
      })
      Promise.all(promises).then(() => commit('clearScheduledChanges'))
    }
  }
}
