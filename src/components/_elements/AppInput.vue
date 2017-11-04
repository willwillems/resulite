<template lang="pug">
  .input-container
    .input-container__title(v-if="title") {{title}}
    input.input-container__input(
      v-bind:value="value"
      v-on:input="sync" 
      :placeholder="placeholder" 
      ref="list"
    )
</template>

<script>
export default {
  name: 'app-input',
  props: {
    value: String,
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    sync (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.input-container {
  &__title {
    font-style: italic;
    font-size: 0.7em;
    padding: 0.5em 0em;
  }
  &__input {
    width: 100%;
    height: 1.5em;
    border-radius: 3px;
    border: solid gray 1px;
  }
}

</style>
