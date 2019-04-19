<template>
  <div id="admin">
    <div class="form">

      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Person Name</label>
          <input type="text" id="name" v-model="name" @blur="$v.name.$touch()" />
          <p v-if="$v.name.$error" class="validation">You must provide the creator's name.</p>
        </div>
        <div class="input" :class="{invalid: $v.title.$error}">
          <label for="title">Project Title</label>
          <input type="text" id="title" v-model="title" @blur="$v.title.$touch()" />
          <p v-if="$v.title.$error" class="validation">You must provide a title for this project.</p>
        </div>
        <div class="input" :class="{invalid: $v.title.$error}">
          <label for="client">Project Client</label>
          <input type="text" id="client" v-model="client" @blur="$v.client.$touch()" />
          <p v-if="$v.client.$error" class="validation">You must indicate the project's client.</p>
        </div>
        <div class="input" :class="{invalid: $v.desc.$error}">
          <label for="desc">Description</label>
          <textarea id="desc" v-model="desc" @blur="$v.desc.$touch()" />
          <p v-if="$v.desc.$error" class="validation">Please provide a brief description of this project.</p>
        </div>
        <div class="input">
          <label for="image">Image Name</label>
          <input type="text" id="image" v-model="image" />
          <p v-if="$v.image.$error" class="validation">What graphic should be shown with this entry?</p>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          &nbsp;
          <button @click="cancelEdit">Cancel Edit</button>
          &nbsp;
          <button @click.prevent="deleteEntry">Delete This Entry</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import { required } from 'vuelidate/lib/validators'
  import { db, auth } from '../../firebase';
  
  export default {
    data () {
      return {
        name: '',
        title: '',
        client: '',
        desc: '',
        image: '',
        vimeo: '',
        entryId: this.$route.params.idofitem,
        entriesObj: null,
        thisEntry: null
      }
    },
    methods: {
      onSubmit () {
        var user = auth.currentUser
        if (user){
          let newEntry = {
            name: this.name,
            title: this.title,
            client: this.client,
            desc: this.desc,
            image: this.image,
            vimeo: this.vimeo
          }
          db.ref('entries').child(this.entryId).set(newEntry)
          .then(res => {this.$store.dispatch('setSuccessMessage', 'Entry Successfully Edited');router.push('/admin?entry=edited')})
          .catch(error => console.log(error.message))
        }
      },
      cancelEdit () {
        router.push('/admin')
      },
      deleteEntry () {
        try {
          db.ref('entries').child(this.entryId).remove()
          this.$store.dispatch('setSuccessMessage', 'Entry Successfully Deleted');
          router.push('/admin')
        } catch (ex){
          console.log('ex.message', ex.message)
        }
      }
    },
    validations: {
      name: {
        required
      },
      title: {
        required
      },
      client: {
        required
      },
      desc: {
        required
      },
      image: {
        required
      },
      vimeo: {
        required
      }
    },
    firebase: {
      // postsArr: db.ref('whatnots'), // loopable with v-for
      entriesObj: { // can use keys, but v-for doesn't loop
        source: db.ref('entries'),
        source: db.ref('entries'),
        asObject: true,
        readyCallback(snapshot) {
          this.thisEntry = this.entriesObj[this.entryId]
          this.name = this.thisEntry.name
          this.title = this.thisEntry.title
          this.client = this.thisEntry.client
          this.desc = this.thisEntry.desc
          this.image = this.thisEntry.image
          this.vimeo = this.thisEntry.vimeo
        },
        cancelCallback(err) {
          console.error(err.message);
        }
      }
    },
    created() {
      if (this.$route.query.entry == 'added'){
        this.newEntrySuccess = true
        window.setTimeout(() => $('#newEntrySuccess').fadeOut(), 3600)
        window.setTimeout(() => this.newEntrySuccess = false, 3601)
      }
    },
    computed: {
      isAdmin() {
        return this.$store.getters.loggedInAsAdmin
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('tryAutoLogin')
        if (!vm.isAdmin) router.push('/signin')
      })
    }
  }
</script>

<style lang="scss">

</style>
