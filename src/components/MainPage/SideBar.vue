<template lang="pug">
  .left-bar
    img.user-headshot(
      :src="newImg || headShot.url" 
      :class="{'drag-over': dragOver }"
      @dragover="handleDragOver" 
      @dragleave="handleDragLeave" 
      @drop="handleDrop")
    p <!-- for spacing-->
      div
        b.user-name {{name}}
      div
        i.user-short-bio {{shortBio}}

    ul.user-links-list
      li(v-for="e in externalLinks" v-if="e")
        a(:href="e.link" target="_blank" rel="noopener") {{e.text}}
      i.fa.fa-pencil
      //i.fa.fa-plus
</template>

<script>
export default {
  name: 'side-bar',
  data () {
    return {
      dragOver: false,
      newImg: '',
      user: {
        name: 'Rutger Willems',
        shortBio: 'I am a work in progress'
      }
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
      return this.$root.user.externalLinks.linkList
    }
  },
  methods: {
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
      const _URL = window.URL || window.webkitURL
      this.newImg = _URL.createObjectURL(file)
      console.log(file)
      // TODO: upload file to FB
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$side-bar-width: 350px;
$headshot-diameter: 170px;

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
}

.user-headshot {
  width: $headshot-diameter;
  height: $headshot-diameter;
  border-radius: 50%;
  margin: auto;
  &.drag-over {
    opacity: 0.6;
  }
}

.user-name {
  font-size: 30px;
  font-weight: 700;
}

.user-short-bio {
  font-weight: 100;
}

.user-links-list {
  font-size: 18px;
  font-weight: 500;
  li {
    transition: opacity .5s ease;
    opacity: 0.71;
    &:hover {
      opacity: 0.9;
    }
  }
  
}
</style>
