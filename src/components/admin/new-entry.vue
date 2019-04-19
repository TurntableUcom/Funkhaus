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
        <div class="input">
          <label for="vimeo">Vimeo Vid ID</label>
          <input type="text" id="vimeo" v-model="vimeo" />
          <p v-if="$v.vimeo.$error" class="validation">Please input the ID of the Vimeo video associated with this entry.</p>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
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
        name: 'Terry Bradshaw',
        title: 'Zoom-Zoom',
        client: 'Infiniti',
        desc: 'Accelerating the Future.',
        image: 'Car',
        vimeo: '95957738'
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
          db.ref('entries').push(newEntry)
          .then(res => {this.$store.dispatch('setSuccessMessage', 'Entry Successfully Added');router.push('/admin')})
          .catch(error => console.log(error.message))
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
  .submit button {
    margin-top: 26px;
  }
  .submit button:hover {
    background-color :#fff;
    border: solid 2px white;
  }
  .input {
    label {
      width: 120px;
      display: inline-block;
    }
    input, textarea {
      width: 450px;
      margin-bottom: 8px;
    }
  }
  .validation, .message.error {
    color: red;
    margin-bottom: 8px;
  }
</style>
