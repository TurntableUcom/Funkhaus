import Vue from 'vue';
import VueRouter from 'vue-router';

import DbDriven from './components/homepage/db-driven.vue';
import HardcodedJson from './components/homepage/hardcoded-json.vue';
import HardcodedHtml from './components/homepage/hardcoded-html.vue';
import Video from './components/video/video.vue';
import AdminDash from './components/admin/dashboard.vue';
import AdminNewEntry from './components/admin/new-entry.vue';
import AdminEditEntry from './components/admin/edit-entry.vue';
import SignupPage from './components/auth/signup.vue';
import SigninPage from './components/auth/signin.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: DbDriven, alias: '/index.html' },
  { path: '/json', component: HardcodedJson },
  { path: '/html', component: HardcodedHtml },
  { path: '/video', component: Video },
  { path: '/admin', component: AdminDash},
  { path: '/admin/add-entry', component: AdminNewEntry },
  { path: '/admin/edit-entry/:idofitem', component: AdminEditEntry },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '*', redirect: '/' }
]

export default new VueRouter({
  mode:'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})