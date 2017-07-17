<template lang="pug">
  <div class="left-bar">
    img.user-headshot(src="./assets/headshot.jpg")
    p <!-- for spacing-->
      div
        b.user-name {{user.name}}
      div
        i.user-short-bio {{user.shortBio}}

    ul.user-links-list
      <li><a href="" target="_blank" rel="noopener">Behance</a></li>
      <li><a href="" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="" target="_blank" rel="noopener">Medium</a></li>
      <li><a href="" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="" target="_blank" rel="noopener">Email</a></li>
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
        shortBio: 'I am a work in progress'
      }
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
