<template>
  <div id="signup">
    <div class="form">
      <div class="message error" v-if="err" style="margin-top:0;margin-bottom:18px">{{ err }}</div>
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Screen Name</label>
          <input type="text"
                  id="name"
                  v-model="name"
                  @blur="$v.name.$touch()" />
          <p v-if="$v.name.$error" class="validation">You must provide your name.</p>
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email</label>
          <input type="email"
                  id="email"
                  v-model="email"
                  @blur="$v.email.$touch()" />
          <p v-if="$v.name.$error" class="validation">Please provide the email address you will log in with.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input type="password"
                  id="password"
                  v-model="password"
                  @blur="$v.password.$touch()" />
          <p v-if="!$v.password.minLen" class="validation">Password must be at least 6 characters long.</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm</label>
          <input type="password"
                  id="confirm-password"
                  v-model="confirmPassword"
                  @blur="$v.confirmPassword.$touch()" />
          <p v-if="$v.confirmPassword.$error" class="validation">The entered passwords do not match.</p>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      err() {
        return this.$store.getters.errorMsg
      }
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          // display additional message
        } else {
          const formData = {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          }
          this.$store.dispatch('signup', formData)
        }
      }
    },
    validations: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    },
    created () {
      this.$store.dispatch('setErrorMessage', '')
    }
  }
</script>

<style scoped lang="scss">
  .error {
    margin:0;
    font-size:1.5rem;
    line-height:1.6;
  }
  #signup {
    width:100%;
    max-width:500px;
    margin:30px auto;

    .input {
      input {
        width:300px;
      }
    }

    .submit {
      text-align: center;
    }
  }
</style>