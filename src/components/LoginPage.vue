<template lang="pug">
  form.login
    fieldset
      legend.legend Login
        .input
          input(v-model="email" type="email" placeholder="Email" required)
        .input
          input(v-model="password" type="password" placeholder="Password" required)
      button(@click="login")
        i.fa.fa-long-arrow-right
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
      password: ''
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit('setLoginStatus', {
            status: true
          })
          this.$router.push({ path: '/' })
        })
        .catch(function (e) {
          console.log(e)
        })
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
