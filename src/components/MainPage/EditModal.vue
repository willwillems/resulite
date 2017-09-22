<template lang="pug">
  .main
    .overlay
    #exit-button(@click="toggleModal") x
    .modal EDIT
</template>

<script>
export default {
  name: 'EditModal',
  data: function () {
    return {
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('toggleEditModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.71;

}

#exit-button {
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
}

.modal {
  position: fixed;
  top: calc(50vh - 200px);
  left: calc(50vw - 250px);
  width: 500px; // this should be responsive
  height: 400px;
  padding: 20px;
  z-index: 10;
  background-color: white;

}
</style>
