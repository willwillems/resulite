<template lang="pug">
  .editor
    transition(name="show-up-1")
      .editor__button.editor__button--small(v-if="editModeIsActive" @click="addList")
        i.fa.fa-list.icon(title="list" aria-hidden="true")
    transition(name="show-up-2")
      .editor__button.editor__button--small(v-if="editModeIsActive" @click="addText")
        i.fa.fa-align-justify.icon(title="text" aria-hidden="true")
    .editor__button.editor__button--big(@click="toggleEditMode")
      i.fa.fa-pencil.icon(aria-hidden="true")
</template>

<script>
import { mapState } from 'vuex'

import c from '@/script/constants'

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
    },
    addList () {
      // create new blank entry en store key in var
      this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .push({
          title: 'new list',
          data: {},
          type: c.DB_ENTRY_LIST
        }).key
    },
    addText () {
      // create new blank entry en store key in var
      const postKey = this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .push({
          title: 'new text',
          data: '',
          type: c.DB_ENTRY_TEXT
        }).key
      // open edit modal with new entry
      this.$store.commit('setEditModal', {
        newState: true,
        postKey
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/vars.scss';

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

  &__button {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: box-shadow 0.5s;
    z-index: 2; // so the smaller ones can hide behind the bigger one
    &:hover {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    &--small {
      width: $small-button-radius;
      height: $small-button-radius;
      border-radius: 50%;
      background-color: gray;
      .icon {
        color: whitesmoke;
        margin: 12px 12px;
      }
    }

    &--big {
      width: $big-button-radius;
      height: $big-button-radius;
      border-radius: 50%;
      background-color: black;
      .icon {
        color: white;
        font-size: 30px;
        margin: 14px 18px;
      }
    }
  }
}

// vue transistions:

.show-up-1-enter-active, .show-up-1-leave-active {
  transition: all 0.4s ease-out;
  transform: translateY(0px);
}

.show-up-1-enter, .show-up-1-leave-to {
  transform: translateY(120px);
}

.show-up-2-enter-active, .show-up-2-leave-active {
  transition: all 0.4s ease-out;
  opacity: 1;
  transform: translateY(0px);
}

.show-up-2-enter, .show-up-2-leave-to {
  z-index: -10;
  transform: translateY(60px);
}
</style>
