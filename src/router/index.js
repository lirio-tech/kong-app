import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import OrdemServico from '../views/OrdemServico'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Home
  },  
  {
    path: '/',
    name: 'Home',
    component: Home
  },    
  {
    path: '/ordem-servico',
    name: 'NovaOrdemServico',
    component: OrdemServico
  },      
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('TOKEN');
//   if(to.name !== 'Login') {
//     if (token || to.name === 'Login') {
//       next()
//     } else {
//       next({name: 'Login'})
//     } 
//   } else {
//     next()
//   }
// }
// );

export default router
