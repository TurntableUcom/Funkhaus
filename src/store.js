import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { fireb, db, auth } from './firebase';

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeVideo: null,
    isAdmin: false,
    errorMessage: '',
    successMessage: ''
  },
  mutations: {
    setActiveVideo (state, video) {
      state.activeVideo = video
    },
    unsetActiveVideo (state) {
      state.activeVideo = null
    },
    setIsAdmin(state, bool) {
      state.isAdmin = bool
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg
    },
    setSuccessMessage(state, msg) {
      state.successMessage = msg
    },
    storeUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = null
      state.isAdmin = false
    }
  },
  actions: {
    setActiveVideo ({commit}, videoDetails) {
      commit('setActiveVideo', videoDetails)
    },
    unsetActiveVideo ({commit}) {
      commit('unsetActiveVideo')
    },
    authStateObserver({commit, dispatch, state}, isNewSignup) {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          if (!isNewSignup) commit('storeUser', assembleUserObject(user))
          dispatch('fetchUser', user.email)
        } else {
          commit('clearUser')
        }
      });
    },
    signup ({commit, dispatch}, authData) {
      auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then (res => {
        dispatch('authStateObserver', true);
        dispatch('storeUserToDb', {
          name: authData.name,
          email: authData.email,
          type: 'admin' // IN A REAL ENVIRONMENT THIS WOULD BE USER SO NORMAL SIGNED-UP USERS WOULD NOT BY DEFAULT BE ADMINS, OBVI
        })
        localStorage.setItem('userId', res.user.uid)
        localStorage.setItem('email', res.user.email)
        localStorage.setItem('refreshToken', res.user.refreshToken)
        let user = auth.currentUser
        if (user){
          user.updateProfile({
            displayName: authData.name,
            photoURL: "/assets/images/avatars/generic-avatar.png"
          })
          .then(() => commit('setIsAdmin', true)) // THIS ALSO WOULDN'T BE SET AUTOMATICALLY
          .catch((error) => {
            console.log(error.message)
            commit('setErrorMessage', error.message)
          })
          .finally(() => {
            router.push('/admin')
          });
        }
      })
      .catch(error => {
        console.log(error.code, error.message)
        commit('setErrorMessage', error.message)
      });
    },
    login ({commit, dispatch}, authData) {
      auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        dispatch('authStateObserver');
        localStorage.setItem('userId', res.user.uid)
        localStorage.setItem('email', res.user.email)
        localStorage.setItem('refreshToken', res.user.refreshToken)
        commit('setIsAdmin', true)
        router.push('/admin')
      })
      .catch(function(error) {
        console.log(error.message)
        commit('setErrorMessage', error.message)
      });
    },
    tryAutoLogin ({commit, dispatch}) {
      const userId = localStorage.getItem('userId')
      const email = localStorage.getItem('email')
      const refreshToken = localStorage.getItem('refreshToken')
      if (!userId) {
        return
      }
      commit('setIsAdmin', true)
      dispatch('authStateObserver')
      dispatch('fetchUser', email)
    },
    logout ({commit}) {
      auth.signOut()
      .then(function() {
        commit('clearUser')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('refreshToken')
        router.push('/?loggedout')
      })
      .catch(function(error) {
        console.log(error.message)
      });
    },
    storeUserToDb ({commit}, userData) {
      if (!userData) {
        return
      }
      var user = auth.currentUser
      if (user){
          user.getIdToken()
          .then(res => {
            axios.post('/users.json?auth=' + res, userData)
            .then(res => {
              router.push('/admin')
            })
            .catch(error => {
              console.log(error.message)
              commit('setErrorMessage', error.message)
            })
          })
          .catch(error => console.log(error.message))
      }
    },
    fetchUser ({commit, state}, userEmail) {
      var user = auth.currentUser
      if (user){
        // TODO: REWORK TO NOT FETCH ALL USERS WITH EACH REQUEST AS IS INDICATED BY THE CONSOLE.LOG BELOW
        // PERHAPS PERFORM THE LOOKUP IN THE LOGIN/SIGNUP PAGES AND ONLY POST THE MUTATION TO THE STORE
        user.getIdToken()
          .then(res => {
            axios.get('/users.json?auth=' + res)
            .then(res => {
              const data = res.data
              for (let key in data) {
                const user = data[key]
                if (user.email == userEmail) {
                  user.uid = key
                  user.refreshToken = user.refreshToken
                  commit('storeUser', assembleUserObject(user))
                  if (user.type == 'admin') commit('setIsAdmin', true)
                  return
                }
              }
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          console.dir(error)
          if (error.toString().includes('401')){
            console.log('yep, it\'s a 401')
            dispatch('logout')
          }
        })
      }
    },
    setErrorMessage ({commit}, msg) {
      commit('setErrorMessage', msg)
    },
    setSuccessMessage ({commit}, msg) {
      commit('setSuccessMessage', msg)
    }
  },
  getters: {
    activeVideo (state) {
      return state.activeVideo
    },
    isAuthenticated (state) {
      return state.user !== null
    },
    loggedInAsAdmin (state) {
      return state.isAdmin
    },
    errorMsg (state) {
      return state.errorMessage
    },
    successMsg (state) {
      return state.successMessage
    }
  }
})

let assembleUserObject = (user) => {
  return {
    userId: user.uid,
    email: user.email,
    name: user.name,
    isAdmin: user.admin,
    refreshToken: user.refreshToken
  }
}