<template lang="pug">
  .main
    div.user-section
      img.user-section__headshot(
        :src="headShotUrl"
        :class="{'left-bar__user-headshot--drag-over': dragOver }"
        @dragover="handleDragOver" 
        @dragleave="handleDragLeave" 
        @drop="handleDrop"
        onclick="document.getElementById('photo-input').click()"
      )
      input(@change="uploadFile($event.target.files[0])" id="photo-input" type="file" name="photo-input" style="display: none;")
      p <!-- for spacing-->
      b.user-section__name {{name || 'John Doe'}}
    form.login(@keydown.enter.prevent="login")
      .login__input
        input(v-model="name" type="name" placeholder="name" required)
      .login__input
        input(v-model="email" type="email" placeholder="email" required)
      .login__input
        input(v-model="password" type="password" placeholder="password" required)
        a(@click.prevent="login")
          i.fa.fa-arrow-right.login__input__button
    i.error-message(v-if="errorMessage") {{errorMessage}}
</template>

<script>
import fb from '@/script/firebase'
import c from '@/script/constants'

// FB
const auth = fb.auth()
const storage = fb.storage().ref()

export default {
  name: 'login-page',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      dragOver: false,
      userImg: ''
    }
  },
  computed: {
    headShotUrl () {
      return this.userImg || '/static/img/pf-placeholder.jpeg'
    }
  },
  methods: {
    login () {
      var that = this
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit('setLoginStatus', {
            status: true
          })
          this.$router.push({ path: '/' })
        })
        .catch(function (e) {
          that.errorMessage = e.message
          console.log(e)
        })
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
      pfStore.put(file).then(function (snapshot) {
        const url = snapshot.downloadURL
        that.$store.commit('scheduleChange', {
          path: `${c.DB_HEADSHOT}/${c.DB_PHOTO_URL}`,
          newVal: url
        })
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

.login {
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
</style>
