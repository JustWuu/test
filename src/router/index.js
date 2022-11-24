import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import DialogueView from '../components/Dialogue.vue'
import SummonView from '../components/Summon.vue'
import PackView from '../components/Pack.vue'
import RegisterView from '../components/Register.vue'
import BattleView from '../components/Battle.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'initial',
      component: RegisterView
    },
    {
      path: '/Home',
      name: 'home',
      component: HomeView,
      children:[
        {
          path:'character',
          name:'character',
          component:() => import("../components/Home/character.vue")
        },
        {
          path:'Info',
          name:'Info',
          component:() => import("../components/Home/Info.vue")
        },
      ]
    },
    {
      path: '/Dialogue',
      name: 'Dialogue',
      component: DialogueView
    },
    {
      path: '/Summon',
      name: 'Summon',
      component: SummonView
    },
    {
      path: '/Pack',
      name: 'Pack',
      component: PackView
    },
    {
      path: '/Battle',
      name: 'Battle',
      component: BattleView
    },
    {
      path: '/:404(.*)*',
      name: '404',
      component: () => import("../views/404.vue")
    },
  ]
})

export default router
