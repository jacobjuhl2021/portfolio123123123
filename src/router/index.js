import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import ExperienceView from '../views/ExperienceView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/post', component: PostView, props: true },
    { path: '/experience', component: ExperienceView }
  ]
})

export default router
