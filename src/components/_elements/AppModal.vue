<template lang="pug">
  div
    .overlay
    #exit-button(@click="toggleModal") x
    .modal 
      h1 {{title}}
      slot
      app-button(@click="finishModal" title="done")
</template>

<script>
import AppButton from '@/components/_elements/AppButton'

export default {
  name: 'app-modal',
  components: {
    AppButton
  },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    toggleModal () {
      this.$emit('input', !this.value)
    },
    finishModal () {
      this.$emit('done')
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
  max-width: 80vw;
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
}

#done-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 5px 20px;
  background-color: black;
  color: white;
  border: none;
  font-weight: 500;
  border-radius: 3px;
}
</style>
