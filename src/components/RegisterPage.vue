<template lang="pug">
  .main
    div.user-section
      div(style="position: relative")
        img.user-section__headshot(
          :src="headShotUrl"
          :class="{'left-bar__user-headshot--drag-over': dragOver }"
          @dragover="handleDragOver" 
          @dragleave="handleDragLeave" 
          @drop="handleDrop"
          onclick="document.getElementById('photo-input').click()"
        )
        span.popover(v-if="userIsRegistered") Click or drag to upload your own pic!
        input(@change="uploadFile($event.target.files[0])" id="photo-input" type="file" name="photo-input" style="display: none;")
      p <!-- for spacing-->
      b.user-section__name {{name || 'John Doe'}}
      i.user-section__subdomain https://{{subDomain || 'my-subdomain'}}.resulite.com
    form.register(@keydown.enter.prevent="next")
      div(v-if="userIsRegistered")
        .register__input
          input(v-model="name" type="name" placeholder="name" required)
        .register__input
          input(v-model="subDomain" type="subdomain" placeholder="subdomain" required)
        button.register__submit-button(@click.prevent="createSub")
      div(v-else)
        .register__input
          input(v-model="email" type="email" placeholder="email" required)
        .register__input
          input(v-model="password" type="password" placeholder="password" required)
          a(@click.prevent="register")
            i.fa.fa-arrow-right.register__input__button
    i.error-message(v-if="errorMessage") {{errorMessage}}
</template>

<script>
import fb from '@/script/firebase'
import c from '@/script/constants'

// FB
const auth = fb.auth()
const db = fb.database()
const storage = fb.storage().ref()

export default {
  name: 'register-page',
  data () {
    return {
      name: '',
      subDomain: '',
      email: '',
      password: '',
      errorMessage: '',
      dragOver: false,
      userImg: '',
      photoUrl: '',
      photoUploadIsDone: true,
      userIsRegistered: false,
      subExistsMessage: 'sorry this subdomain is already taken'
    }
  },
  computed: {
    headShotUrl () {
      return this.userImg || '/static/img/pf-placeholder.jpeg'
    }
  },
  methods: {
    next () {
      // triggerd by enter button
      if (!this.userIsRegistered) this.register()
      else this.createSub()
    },
    register () {
      var that = this
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          that.userIsRegistered = true
          that.$store.commit('setLoginStatus', {status: true})
          that.$store.commit('setUID', {uid: user.uid})
          return db.ref(`/${c.DB_USERS_PATH}/${user.uid}`).set({
            registered: Date.now()
          })
        })
        .catch(function (e) {
          if (e.code === 'auth/email-already-in-use') {
            that.login(that.email, that.password)
            return
          }
          that.errorMessage = e.message
          console.log(e)
        })
    },
    login (email, password) {
      var that = this
      auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          that.userIsRegistered = true
          that.$store.commit('setLoginStatus', {status: true})
          that.$store.commit('setUID', {uid: user.uid})
        })
        .catch(function (e) {
          that.errorMessage = e.message
          console.log(e)
        })
    },
    createSub () {
      var that = this
      return this.checkIfSubExists(this.subDomain)
        .then(exists => {
          if (exists) throw new Error(this.subExistsMessage)
          else db.ref(`/${c.DB_USERS_PATH}/${this.$store.state.appState.uid}`).set({
            name: that.name,
            photoUrl: that.photoUrl,
            subDomain: that.subDomain
          })
        })
        .then(this.redirectToPersonalPage)
        .catch(e => {
          console.log(e, e.code)
          if (e === this.subExistsMessage || e.code === 'PERMISSION_DENIED') {
            this.errorMessage = this.subExistsMessage
            return
          }
          this.errorMessage = e.message
        })
    },
    redirectToPersonalPage () {
      // redirect user to his new page
      console.log('redirecting to personal page')
      window.location.href = `http://${this.subDomain}.resulite.com/` // this.subDomain could be changed inbetween promises
      // this.$router.push({ path: '/' })
    },
    checkIfSubExists (sub) {
      return db
        .ref(`/${c.DB_ROOT_USER_PATH}`)
        .child(sub)
        .child(c.DB_PAGEDATA)
        .once('value')
        .then(dataSnapshot => Promise.resolve(dataSnapshot.exists()))
    },
    handleDragOver (evt) {
      this.dragOver = true
      evt.stopPropagation()
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    },
    handleDragLeave (evt) {
      this.dragOver = false
    },
    handleDrop (evt) {
      evt.stopPropagation()
      evt.preventDefault()
      this.dragOver = false
      const files = evt.dataTransfer.files  // FileList object.
      const file = files[0]                 // File     object.
      this.uploadFile(file)
    },
    uploadFile (file) {
      const _URL = window.URL || window.webkitURL
      this.userImg = _URL.createObjectURL(file)
      const pfStore = storage.child(`${this.$store.state.appState.uid}/${file.name}`)
      var that = this
      that.photoUploadIsDone = false
      pfStore.put(file).then(function (snapshot) {
        that.photoUrl = snapshot.downloadURL
        that.photoUploadIsDone = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'src/vars.scss';

.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}
.user-section {
  text-align: center;

  &__name {
    font-size: 35px;
    font-weight: 700;
    &:focus { 
      outline: none; // removes the default grey border, generaly a bad idea
      color: black;
    }
  }

  &__subdomain {
    display: block;
    font-weight: 300;
  }

  &__headshot {
    display: inline-block;
    width: $headshot-diameter;
    height: $headshot-diameter;
    border-radius: 50%;
    margin: auto;
    &.drag-over {
      opacity: 0.6;
    }
  }
}

.register {
  // width: $login-input-width;
  &__input {
    position: relative;
    margin: 10px 0px;

    input {
      width: $login-input-width - 4px;
      background-color: $login-input-bg-color;
      border: 1px solid $login-input-border-color;
      border-radius: 5px;
      padding: 10px; // determines height input
      font-weight: 600;
      font-size: 14px;
    }

    &__button {
      position: absolute;
      right: 5px;
      top: 0px;
      padding: 11px 5px;
      cursor: pointer;
    }
  }
}

.error-message {
  opacity: 0.71;
  text-align: center;
}

.popover {
  background-color: rgba(0,0,0,0.85);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
  color: #fff;
  padding: 7px 10px;
  position: absolute;
  top: $headshot-diameter / 2;
  right: -200px;
  width: 200px;
  z-index: 4;
  font-size: 12px;
  
  &:before {
      border-right: 7px solid rgba(0,0,0,0.85);
      border-bottom: 7px solid transparent;
      border-top: 7px solid transparent;
      left: -7px;
      content: '';
      display: block;
      top: 50%;
      margin-top: -7px;
      position: absolute;
    }
}
</style>
