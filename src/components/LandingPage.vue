<template lang="pug">
  .main
    .brand-container
      img#logo(src="static/img/logo.svg")
      .spacer
      #name Resulite
    .subtext-container
      #subtext
        span Resulite is
        vue-typer(:text='purposeList' :type-delay='100')
    #menu
      ul
        li What is this?
        li How does it look?
        li Why do I need it?
        li Another platform?
        li 
          b(@click="register") Give us a shot!
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  name: 'LandingPage',
  components: {
    VueTyper
  },
  data: function () {
    return {
      purposeList: [
        ' a blog',
        ' a resume',
        ' a homepage'
      ]
    }
  },
  methods: {
    register () {
      window.location.href = 'https://beta.resulite.com/register'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center; 
  flex-direction: column; // order them in column not row
  align-items: center; // centre all children horizontal
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.brand-container {
  margin-top: 100px;
  text-align: center;
  @media only screen and (min-width: 480px) {
    white-space: nowrap;
    & > * {
      display: inline-block;
    }
  }

  #logo {
    height: 7rem;
  }

  .spacer {
    width: 30px;
    @media only screen and (max-width: 480px) {
      display: none;
    }
  }

  #name {
    font-size: 10rem;
    font-weight: 500;
    margin-bottom: -15px; // to pull the subtext closer
    @media only screen and (max-width: 480px) {
      font-size: 5rem;
    }
  }
}

.subtext-container {
  height: 2.2rem;
  font-size: 2rem;
  font-weight: 100;
  font-style: italic;
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
  }
  #subtext {
    position: absolute; // this is centred this way to be able to to the live typing
    left: 34vw;
    white-space: nowrap;
    text-align: left;
  }
}

#menu {
  ul {
    @media only screen and (max-width: 480px) {
      padding: 0px;
    }
  }

  li {
    display: inline; // horizontal list
    margin: 0px 10px;
    font-weight: 500;
    text-align: center;

    @media only screen and (max-width: 480px) {
      display: list-item;
      list-style-type: none;
      padding: 5px;
    }

    &:hover {
      color: black;
    }
  }
}

</style>
