<template lang="pug">
  .left-bar
    img.left-bar__user-headshot(
      v-if="!editModeIsActive"
      :src="newImg || headShot.url" 
    )
    img.left-bar__user-headshot(
      v-else
      :src="newImg || headShot.url" 
      :class="{'left-bar__user-headshot--drag-over': dragOver }"
      @dragover="handleDragOver" 
      @dragleave="handleDragLeave" 
      @drop="handleDrop"
      onclick="document.getElementById('photo-input').click()"
    )
    input(@change="uploadFile($event.target.files[0])" id="photo-input" type="file" name="photo-input" style="display: none;")
    p <!-- for spacing-->
      div
        b.left-bar__user-name(
          :contenteditable="editModeIsActive" 
          @input=`scheduleChange({
            attr: 'DB_NAME_ATTR',
            val: $event.target.innerText
          })`
        ) {{name}}
      div
        i.left-bar__user-short-bio(
          :contenteditable="editModeIsActive" 
          @input=`scheduleChange({
            attr: 'DB_BIO_ATTR',
            val: $event.target.innerText
          })`
        ) {{shortBio}}

    ul.left-bar__user-links-list
      li(v-for="e in externalLinks" v-if="e")
        a(:href="e.link" target="_blank" rel="noopener") {{e.text}}
      .left-bar__list-edit-button(
        v-if="editModeIsActive",
        @click="toggleLinkListModal"
      ) EDIT
    user-link-list-edit-modal(v-model="editModalIsActive" v-if="editModalIsActive")
</template>

<script>
import { mapState } from 'vuex'

import c from '@/script/constants'
import fb from '@/script/firebase'

import UserLinkListEditModal from '@/components/MainPage/UserLinkListEditModal'

const storage = fb.storage().ref()

export default {
  name: 'side-bar',
  components: {
    UserLinkListEditModal
  },
  data () {
    return {
      dragOver: false,
      newImg: '',
      editModalIsActive: false
    }
  },
  computed: {
    name () {
      return this.$root.user.displayName
    },
    headShot () {
      return this.$root.user.headShot
    },
    shortBio () {
      return this.$root.user.shortBio
    },
    externalLinks () {
      return this.$root.user.externalLinks ? this.$root.user.externalLinks.linkList : []
    },
    ...mapState({
      editModeIsActive: state => state.appState.editModeIsActive
    })
  },
  methods: {
    toggleLinkListModal () {
      this.editModalIsActive = !this.editModalIsActive
    },
    handleDragOver (evt) {
      this.dragOver = true
      evt.stopPropagation()
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    },
    handleDragLeave (evt) {
      this.dragOver = false
    },
    handleDrop (evt) {
      evt.stopPropagation()
      evt.preventDefault()
      this.dragOver = false
      const files = evt.dataTransfer.files  // FileList object.
      const file = files[0]                 // File     object.
      this.uploadFile(file)
    },
    uploadFile (file) {
      const _URL = window.URL || window.webkitURL
      this.newImg = _URL.createObjectURL(file)
      const pfStore = storage.child(`${this.$store.state.appState.uid}/${file.name}`)
      var that = this
      pfStore.put(file).then(function (snapshot) {
        const url = snapshot.downloadURL
        that.$store.commit('scheduleChange', {
          path: `${c.DB_HEADSHOT}/${c.DB_PHOTO_URL}`,
          newVal: url
        })
      })
    },
    scheduleChange ({attr, val}) {
      this.$store.commit('scheduleChange', {
        path: `${c[attr]}/`,
        newVal: val
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'src/vars.scss';

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 5px;
}

li {
  margin: 15px 10px;
  a{
    text-decoration: none;
  }
}

a {
  color: #35495E;
}

.left-bar {
  width: $side-bar-width;
  text-align: center;
  &__user-headshot {
    width: $headshot-diameter;
    height: $headshot-diameter;
    border-radius: 50%;
    margin: auto;
    &--drag-over {
      opacity: 0.6;
    }
  }
  &__user-name {
    font-size: 30px;
    font-weight: 700;
    &:focus { 
      outline: none; // removes the default grey border, generaly a bad idea
      color: black;
    }
  }

  &__user-short-bio {
    font-weight: 100;
    &:focus { 
      outline: none; // removes the default grey border, generaly a bad idea
      color: black;
    }
  }

  &__user-links-list {
    font-size: 18px;
    font-weight: 500;
    li a {
      transition: opacity .5s ease;
      opacity: 0.71;
      // contact links
      &[href^="mailto:"] {
      opacity: 0.9
      }

      &:hover {
        opacity: 1;
      }
    }
    
  }

  &__list-edit-button {
    height: 10px;
    width: 40px;
    margin: 30px ($side-bar-width/2 - 20px - 15px -5px); // - 1/2width - padding
    padding: 5px 15px;
    background-color:#2c2c2c;
    color: white;
    border: none;
    border-radius: 3px;
    font-weight: 700;
    font-size: 10px;
    cursor: pointer;
  }
}
</style>
