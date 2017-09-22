<template lang="pug">
  .main
    .overlay
    #exit-button(@click="toggleModal") x
    .modal 
      h1 Edit.
      textarea(v-if="modalTypeIsText")
      .input-container
        .title Title
        input.input
        .title Subtitle
        input.input
        .title Link
        input.input
      #done-button(@click="finishModal") DONE
</template>

<script>
export default {
  name: 'EditModal',
  data: function () {
    return {
    }
  },
  computed: {
    modalTypeIsText () {
      return false
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('toggleEditModal')
    },
    finishModal () {
      this.$store.commit('setEditModal', {
        newState: false
      })
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
  // height: 400px;
  padding: 20px;
  padding-bottom: 50px; // for the edit button
  z-index: 10;
  background-color: white;
  h1 {
    font-size: 4rem;
    margin: 20px 0px;
    &:nth-child(1) {
      margin-top: 0px;
    }
  }
  textarea {
    width: 100%;
    height: 200px;
  }
  .input-container {
    margin: 10px 0px;
    .title {
      font-style: italic;
      font-size: 0.7em;
      padding: 0.5em 0em;
    }
  }
  .input {
    width: 100%;
    height: 1.5em;
    border-radius: 3px;
    border: solid gray 1px;
  }
}

#done-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 5px 20px;
  background-color: black;
  color: white;
  font-weight: 500;
  border-radius: 3px;
}
</style>
