<template>
  <div id="admin">

    <div class="success" id="successMessage" v-if="successMessage">New Item Entered</div>
    <div class="error" id="errorMessage" v-if="errorMessage">New Item Entered</div>

    <button @click="addEntry" id="addNew">Add New Entry</button>

    <div v-for="entry in entries" :key="entry.id">
      <button @click="editEntry($event, entry.id)" class="editEntry">Edit</button>
      &nbsp;
      {{ entry.name }}
      &mdash;
      {{ entry.client }}
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import { db, auth } from '../../firebase'

  export default {
    data () {
      return {
        successMessage: false,
        errorMessage: false,
        entries: []
      }
    },
    methods: {
      addEntry () {
        router.push('/admin/add-entry')
      },
      editEntry(event, entryId) {
        router.push('/admin/edit-entry/' + entryId)
      }
    },
    created() {
      /* IF DOING VIA QUERYSTRING
      //
      if (this.$route.query.entry == 'added'){
        this.newEntrySuccess = true
        window.setTimeout(() => $('#newEntrySuccess').fadeOut(), 3600)
        window.setTimeout(() => this.newEntrySuccess = false, 3601)
      }
      */
     if (this.succeessMessage) successMessage = true
     if (this.errorMessage) errorMessage = true
    },
    computed: {
      isAdmin() {
        return this.$store.getters.loggedInAsAdmin
      },
      successMessage() {
        return this.$store.getters.successMsg
      },
      errorMessage() {
        return this.$store.getters.errorMsg
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('tryAutoLogin')
        if (!vm.isAdmin) router.push('/signin')
      })
    },
    firebase: {
      entries: {
        source: db.ref('entries'),
        readyCallback(snapshot) {
          for (let idx in this.entries) {
            const entry = this.entries[idx]
            const dbkey = entry['.key']
            entry.id = dbkey
            this.entries[idx] = entry
          }
        },
        cancelCallback(err) {
          console.error(err);
        }
      }
    }
  }
</script>

<style lang="scss">
  #admin {
    padding:35px 20px 16px;
    width:100%;
    max-width:1150px;
    margin:auto;
    position:relative;

    div {
      clear:both;
      font-family:Arial, Helvetica, sans-serif;
    }
    
    .form {
      width:100%;
    }

    button#addNew, button#editCategories {
      position:absolute;
      right:20px;
      top:38px
    }

    button#editCategories {
      top:110px
    }

    .editEntry {
      padding:2px 8px;
    }

    .ft {
      font-size:1.3rem;
      color:#aaa;
      font-weight:bold;
    }
  }
</style>