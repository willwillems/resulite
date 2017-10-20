<template lang="pug">
  .main-content
    .category(v-for="(e, postKey, i) in content" v-if="e")
      h1.entry-title
        span(
          :contenteditable="editModeIsActive" 
          @input=`scheduleChange({
            postKey, 
            attr: 'title',
            val: $event.target.innerText
          })`
        ) {{e.title}}
      .text-container(v-if="e.type === 'text'")
        p.text-field(
          :contenteditable="editModeIsActive"
          @input=`scheduleChange({
            postKey, 
            attr: 'data',
            val: $event.target.innerText
          })`
        ) {{e.data}}
      div(v-else-if="e.type === 'list'")
        ul.side-list(:class="{'slimer': editModeIsActive}")
          li.list-entry(v-for="post in firstTenList(e.data)", v-if="post")
            a(:href="post.link")
              b {{post.title}}
              span
                u.spacer &nbsp; &nbsp;
              i {{post.subTitle}}
        // make list smaller when edit mode is active
        ul.side-list(v-if="editModeIsActive")
          li(v-for="(post, entryKey, i) in firstTenList(e.data)", v-if="post")
            .icon-container(v-if="editModeIsActive")
              i.fa.fa-pencil.edit-icon(@click="activateEditModal(postKey, entryKey)" aria-hidden="true")
              i.fa.fa-trash.edit-icon(@click="deleteEntry(postKey, entryKey)" aria-hidden="true")
        a(v-if="remainingListLenght(e.data)", href="/") click for {{remainingListLenght(e.data)}} more
        .add-entry(v-if="editModeIsActive" @click="addListEntry(postKey)")
          i.fa.fa-plus
  </div>
</template>

<script>
import { mapState } from 'vuex'

import c from '@/script/constants'

export default {
  name: 'main-content',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    content () {
      return this.$root.user.contentList
    },
    ...mapState({
      editModeIsActive: state => state.appState.editModeIsActive
    })
  },
  methods: {
    firstTenList (list = {}) {
      let newObject = {}
      let i = 0
      for (let key in list) {
        newObject[key] = list[key]
        i++
        if (i === 10) return newObject // first ten entries
      }
      return newObject
    },
    remainingListLenght (list = {}) {
      return Object.values(list).slice(9).length
    },
    activateEditModal (postKey, entryKey) {
      this.$store.commit('setEditModal', {
        newState: true,
        postKey,
        entryKey
      })
    },
    deleteEntry (postKey, entryKey) {
      this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .child(postKey)
        .child(c.DB_DATA_ATTR)
        .child(entryKey)
        .remove()
    },
    addListEntry (postKey) {
      // create new blank entry en store key in var
      const entryKey = this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .child(postKey)
        .child(c.DB_DATA_ATTR)
        .push({
          title: '',
          subTitle: '',
          link: ''
        }).key
      // open edit modal with new entry
      this.$store.commit('setEditModal', {
        newState: true,
        postKey,
        entryKey
      })
    },
    deletePost (postKey) {
      this.$root.$firebaseRefs.user
        .child(c.DB_CONTENTLIST)
        .child(postKey)
        .remove()
      // open edit modal with new entry
    },
    editPost (postKey) {
      console.log('editposy')
    },
    scheduleChange ({postKey, attr, val}) {
      console.log(arguments)
      this.$store.commit('scheduleChange', {
        path: `contentList/${postKey}/${attr}/`,
        newVal: val
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$side-bar-width: 350px;
$lists-width: 580px;

h1 {
  font-size: 55px;
  margin: 20px 0px;
}

h1, h2 {
  font-weight: 700;
}

ul {
  list-style-type: none;
  padding: 0px;
}

li {
  margin: 0px 0px;
  max-width: $lists-width;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;

  &:hover {
    text-decoration: underline;
    .spacer {
      text-decoration: underline;
    }
  }

  .spacer {
    text-decoration: none;
    display: inline-block;
    opacity: 0.9;
  }

  a{
    text-decoration: none;
  }
}

.main-content {
  max-height: calc(100vh - 40px); //complete viewport minus padding
  min-width: $lists-width;
  max-width: 100vw;
  width: calc(100vw - #{$side-bar-width}); // interpolation with #{} is neccecairy in calc
  overflow-y: scroll;
  @media screen and (max-device-width: 640px) {
    overflow-y: none;
    max-height: none;
    min-width: 360px; // otherwise it overflows both on the right and left, this can also be achieved trough better flexbox shit
  }
}

.category {
  position: relative; // so we can absolutely pos els in div
  margin: 10px;
}

.entry-title {
  span:focus { 
    outline: none; // removes the default grey border, generaly a bad idea
    color: black;
  }
}

.list-entry {
  b {
    opacity: 0.91;
  }
  i {
    opacity: 0.6;
    font-weight: 200;
  }
}

.side-list {
  display: inline-block;
}

.side-list.slimer {
  width: $lists-width - 45px;
}

.icon-container {
  display: inline-block;
}

.edit-icon {
  display: inline-block;
  margin: 0px 5px;
  &:hover {
    color: #fc4f4f;
  }
}

.button {
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 5px 15px;
  font-weight: 700;
  font-size: 10px;
  &.right {
    float: right;
  }
}

.text-container {
  width: $lists-width;
  p:focus { 
    outline: none; // removes the default grey border, generaly a bad idea
    color: black;
  }
}

.add-entry {
  margin: -0.6em 0px; // kinda hacky, this is to prevent shifing when edit mode is enabled
}

.edit-button {
  display:inline-block;
  font-size: 25px;
  line-height: 45px;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: bottom;
  color: grey;
}

</style>
