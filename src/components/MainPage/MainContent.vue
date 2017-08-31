<template lang="pug">
  .main-content
    .category(v-for="e in content" v-if="e")
      h1 {{e.title}}
      .text-container(v-if="e.type === 'text'")
        p.text-field(:contenteditable="editModeIsActive") {{e.data}}
        .button-container(v-if="editModeIsActive")
          button.button.right EDIT
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
          li(v-for="post in firstTenList(e.data)", v-if="post")
            .icon-container
              i.fa.fa-pencil.edit-icon(aria-hidden="true")
              i.fa.fa-trash.edit-icon(aria-hidden="true")
        a(v-if="remainingListLenght(e.data)", href="/") click for {{remainingListLenght(e.data)}} more
  </div>
</template>

<script>
export default {
  name: 'main-content',
  data () {
    return {
      editModeIsActive: true
    }
  },
  created () {
    console.log(this.$root)
  },
  computed: {
    content () {
      return this.$root.user.contentList
    }
  },
  methods: {
    firstTenList (list) {
      return list.slice(0, 9) // first ten entries
    },
    remainingListLenght (list) {
      return list.slice(9).length
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
  margin: 30px 0px;
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
  margin: 10px;
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
  width: 580px;
}

</style>
