
<template lang="pug">
  button.button(
    @click="clicked"
    :style="`background-color: ${color};`"
    :class="{'inactive': !active}"
  ) {{uppercaseTitle}}
</template>

<script>
export default {
  name: 'app-button',
  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black'
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    uppercaseTitle () {
      return this.title.toLocaleUpperCase()
    }
  },
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 5px 20px;
  // background-color: black;
  color: white;
  border: none;
  font-weight: 500;
  border-radius: 3px;
  &.inactive {
    opacity: 0.71;
  }
}
</style>
