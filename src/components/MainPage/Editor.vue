<template lang="pug">
  .editor
    .small-button
      i.fa.fa-list.edit-icon(title="list" aria-hidden="true")
    .small-button
      i.fa.fa-align-justify.edit-icon(title="text" aria-hidden="true")
    .big-button
      i.fa.fa-pencil.edit-icon(aria-hidden="true")
</template>

<script>
export default {
  name: 'editor',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$small-button-radius: 40px;
$big-button-radius: 60px;

.editor {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * { // all children
    margin: 10px;
  }
}

.small-button, .big-button {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}

.small-button {
  width: $small-button-radius;
  height: $small-button-radius;
  border-radius: 50%;
  background-color: gray;
  i {
    color: whitesmoke;
    margin: 12px 12px;
  }
}

.big-button {
  width: $big-button-radius;
  height: $big-button-radius;
  border-radius: 50%;
  background-color: black;
  i {
    color: white;
    font-size: 30px;
    margin: 14px 18px;
  }
}
</style>
