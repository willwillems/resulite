<template lang="pug">
  app-modal.modal(v-model="value" title="Edit." @close="closeModal" @done="finishModal")
      .modal__input-container(v-for="(link, i) in linkInput" v-if="link")
        h2.modal__field-index(@click="removeEntryFromList(i)") {{i+1}}.
        app-input(v-model="link.text" :placeholder="linkList[i] ? linkList[i].text : 'text'" title="Title")
        app-input(v-model="link.link" :placeholder="linkList[i] ? linkList[i].link : 'link'" title="Subtitle")
      i.fa.fa-plus(@click="addLinkToList")
</template>

<script>
import { mapState } from 'vuex'

import c from '@/script/constants'

import AppModal from '@/components/_elements/AppModal'
import AppInput from '@/components/_elements/AppInput'

export default {
  name: 'EditModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppModal,
    AppInput
  },
  data: function () {
    return {
      linkInput: {}
    }
  },
  created () {
    this.linkInput = JSON.parse(JSON.stringify(this.linkList || {})) // we don't want to pass by refrence
  },
  mounted () {
    // fix this:
    // this.$refs.list.focus()
  },
  computed: {
    linkList () {
      return this.$root.user[c.DB_LINKLIST][c.DB_LINKLIST_LIST]
    },
    editDataRef () {
      return this.$root.$firebaseRefs.user
        .child(c.DB_LINKLIST)
        .child(c.DB_LINKLIST_LIST)
    },
    ...mapState({
    })
  },
  methods: {
    closeModal () {
      this.$emit('input', false)
    },
    removeEntryFromList (key) {
      this.linkInput.splice(key, 1)
    },
    addLinkToList () {
      this.linkInput.push({
        text: '',
        link: ''
      })
    },
    finishModal () {
      if (this.linkInput === this.linkList) {
        this.closeModal()
        return // nothing to see here move along
      }
      this.editDataRef
        .set(this.linkInput)
        .then(() => {
          this.closeModal()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal {
  &__input-container {
    margin: 10px 0px;
  }

  &__field-index {
    margin: 10px 0px;
  }
}

</style>
