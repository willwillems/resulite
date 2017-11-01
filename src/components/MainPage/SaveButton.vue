<template lang="pug">
  .snackbar
    i.text Save?
    .buttons
      i.button.fa.fa-check.check(aria-hidden="true" @click="save")
      i.button.fa.fa-times.cross(aria-hidden="true" @click="cancel")
</template>

<script>
export default {
  name: 'save-button',
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
  top: 30px;
  right: 50px;
  max-width: 100vw;
  //width: 100px;
  //height: 50px;
}

.buttons {
  width: 100%;
  font-size: 20px;
  cursor: pointer;

  .check {
    color: green;
    float: left;
  }
  .cross {
    color: red;
    float: right;
  }
}

</style>
