<template lang="pug">
  <div class="main-content">
    .category(v-for="entry in user.content")
      h1 Blog posts
      p(v-if="entry.type === 'text'") {{entry.data}}
      ul(v-else-if="entry.type === 'list'")
        li.list-entry(v-for="post in entry.data")
          a(href="/")
            b {{post.title}}
            span
              u.spacer &nbsp; &nbsp;
            i {{post.subText}}
      a(v-if="entry.type === 'list'", href="/") click for {{10}} more
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      user: {
        name: 'Rutger Willems',
        shortBio: 'I am a work in progress',
        content: [
          {
            type: 'text',
            data: 'Welcome to the test version of ResuLite'
          },
          {
            type: 'list',
            data: [
              {
                title: 'Functional programming 101',
                link: '/',
                subText: 'The basics of the hot and new trend in javascript, all the cool kids are using it blah blah'
              },
              {
                title: 'Why you should take naps at work',
                link: '/',
                subText: 'A 40-minute naps seems to increase productivity by a staggering 400%, recent research in Straussberg indicates'
              }
            ]
          }
        ]
      }
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

</style>
