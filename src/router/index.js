import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import Perfil from '../views/Perfil'
import OrdemServico from '../views/OrdemServico'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },  
  {
    path: '/perfil',
    name: 'Perfil', 
    component: Perfil
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
  {
    path: '/ordem-servico/:_id',
    name: 'EditOrdemServico',
    component: OrdemServico
  },    
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('TOKEN');
  if(to.name !== 'Login') {
    console.log(token);
    if (token || to.name === 'Login') {
      next()
    } else {
      next({name: 'Login'})
    } 
  } else {
    next()
  }
}
);

export default router
