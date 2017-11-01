<template lang="pug">
  .main
    div.user-section
      img.user-section__headshot( :src="headShot.url")
      p <!-- for spacing-->
      b.user-section__name {{name}}
    form.login(@keydown.enter.prevent="login")
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

// FB
const auth = fb.auth()

export default {
  name: 'login-page',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    name () {
      return this.$root.user.displayName
    },
    headShot () {
      return this.$root.user.headShot
    }
  },
  methods: {
    login () {
      var that = this
      auth.signInWithEmailAndPassword(this.email, this.password)
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
