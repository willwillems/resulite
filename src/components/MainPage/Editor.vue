<template lang="pug">
  .editor
    transition(name="show-up")
      #1.small-button(v-if="editModeIsActive")
        i.fa.fa-list.edit-icon(title="list" aria-hidden="true")
    transition(name="show-up")
      #2.small-button(v-if="editModeIsActive")
        i.fa.fa-align-justify.edit-icon(title="text" aria-hidden="true")
    .big-button(@click="toggleEditMode")
      i.fa.fa-pencil.edit-icon(aria-hidden="true")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'editor',
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState({
      editModeIsActive: state => state.appState.editModeIsActive
    })
  },
  methods: {
    toggleEditMode () {
      this.$store.commit('toggleEditMode')
    }
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

// vue transistions:

.show-up-enter-active, .show-up-leave-active {
  transition: transform 0.2s ease-out;
  transform: none;
}

.show-up-enter, .show-up-leave-to {
  opacity: 0;
  #1 {
    transform: translateY(30px)
  }
  #1 {
    transform: translateY(15px)
  }
}
</style>
