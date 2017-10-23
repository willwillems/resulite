<template lang="pug">
  .main
    .overlay
    #exit-button(@click="toggleModal") x
    .modal 
      h1 Edit.
      textarea(v-if="editModalTypeIsText" v-model="textInput" ref="text") {{textData}}
      .input-container(v-else)
        .title Title
        input.input(v-model="listInput.title" :placeholder="listData.title" ref="list")
        .title Subtitle
        input.input(v-model="listInput.subTitle" :placeholder="listData.subTitle")
        .title Link
        input.input(v-model="listInput.link" :placeholder="listData.link")
      button#done-button(@click="finishModal") DONE
</template>

<script>
import { mapState } from 'vuex'

import c from '@/script/constants'

export default {
  name: 'EditModal',
  data: function () {
    return {
      textInput: '',
      listInput: {}
    }
  },
  created () {
    this.textInput = this.textData
    this.listInput = JSON.parse(JSON.stringify(this.listData || {})) // we don't want to pass by refrence
  },
  mounted () {
    if (this.editModalTypeIsText) this.$refs.text.focus()
    else this.$refs.list.focus()
  },
  computed: {
    textData () {
      return this.$root.user[c.DB_CONTENTLIST][this.editModalContentKey][c.DB_DATA_ATTR]
    },
    listData () {
      return this.$root.user[c.DB_CONTENTLIST][this.editModalContentKey][c.DB_DATA_ATTR][this.editModalEntryKey]
    },
    editDataRef () {
      return this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .child(this.editModalContentKey)
    },
    ...mapState({
      userPath: state => state.appState.userPath,
      editModalContentKey: state => state.appState.editModalContentKey,
      editModalEntryKey: state => state.appState.editModalEntryKey,
      editModalTypeIsText: state => state.appState.editModalTypeIsText
    })
  },
  methods: {
    toggleModal () {
      this.$store.commit('toggleEditModal')
    },
    finishModal () {
      if (this.textInput === this.textData && this.listInput === this.listData) {
        this.$store.commit('setEditModal', {
          newState: false
        })
        return // nothing to see here move along
      }
      if (this.editModalTypeIsText) {
        console.log(this.textInput)
        this.editDataRef
          .update({
            data: this.textInput
          })
          .then(() => {
            this.$store.commit('setEditModal', {
              newState: false
            })
          })
      } else {
        this.editDataRef
          .child(c.DB_DATA_ATTR)
          .child(this.editModalEntryKey)
          .update(this.listInput)
          .then(() => {
            this.$store.commit('setEditModal', {
              newState: false
            })
          })
      }
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
  border: none;
  font-weight: 500;
  border-radius: 3px;
}
</style>
