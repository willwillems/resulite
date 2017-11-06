<template lang="pug">
  .snackbar
    .buttons
      app-button(title="commit changes" @clicked="save").check
      app-button(title="discard" @clicked="cancel").cross
      //
        i.button.fa.fa-check.check(aria-hidden="true" @click="save")
        i.button.fa.fa-times.cross(aria-hidden="true" @click="cancel")
</template>

<script>
import AppButton from '@/components/_elements/AppButton'

export default {
  name: 'save-button',
  components: {
    AppButton
  },
  data: function () {
    return {
    }
  },
  methods: {
    save () {
      this.$store.dispatch('saveChanges')
    },
    cancel () {
      this.$store.commit('clearScheduledChanges')
      window.location.reload(false) // this is shite and needs to go
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.snackbar {
  position: fixed;
  top: 15px;
  right: 20px;
  max-width: 100vw;
  //width: 100px;
  //height: 50px;
}

.text {
  opacity: 0.9;
}

.buttons {
  width: 100%;

  .check {
    position: unset;
    margin: 0px 10px 10px 0px;
    float: left;
  }
  .cross {
    position: unset;  
    margin: 0px 0px 10px 10px;
    float: right;
  }
}

</style>
