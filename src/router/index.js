import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp'
import Home from '../views/Home'
import Perfil from '../views/Perfil'
import OrdemServico from '../views/OrdemServico'
import UsuarioList from '../views/UsuarioList'
import UsuarioForm from '../views/UsuarioForm'
import CompanyForm from '../views/CompanyForm'
import ContactUs from '../views/ContactUs'
import Help from '../views/Help' 
import Android from '../views/Android'
import IPhone from '../views/IPhone'
import Payment from '../views/Payment'
import IdentifyDeviceRedirect from '../views/IdentifyDeviceRedirect'
import SystemCompanyApplyPlan from '../views/system/SystemCompanyApplyPlan'
import SystemCompanyOption from '../views/system/SystemCompanyOption'
import SystemControlPlan from '../views/system/SystemControlPlan'
import SystemCompanyList2 from '../views/system/SystemCompanyList2'
import SystemCompaniesActives from '../views/system/SystemCompaniesActives'
import SystemUserList from '../views/system/SystemUserList'
import SystemUser from '../views/system/SystemUser'
import SystemPayments from '../views/system/SystemPayments'
import Analytics from '../views/Analytics'
import storage from '../storage'
import PasswordRecovery from '../views/PasswordRecovery'
import RateUsView from '../views/RateUsView' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },  
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },    
  {
    path: '/perfil',
    name: 'Perfil', 
    component: Perfil
  },   
  {
    path: '/admin/users',
    name: 'UsuarioList', 
    component: UsuarioList
  },  
  {
    path: '/admin/users/:_id',
    name: 'UsuarioForm', 
    component: UsuarioForm
  },    
  {
    path: '/admin/payment/:planName',
    name: 'Payment', 
    component: Payment
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
  {
    path: '/company/:_id',
    name: 'CompanyForm',
    component: CompanyForm
  },     
  {
    path: '/public/fale-conosco',
    name: 'FaleConosco', 
    component: ContactUs
  },     
  {
    path: '/public/help',
    name: 'Help', 
    component: Help
  },   
  {
    path: '/public/android',
    name: 'Android', 
    component: Android
  },    
  {
    path: '/public/iphone',
    name: 'IPhone', 
    component: IPhone
  },     
  {
    path: '/public/recovery/:code',
    name: 'Recovery', 
    component: PasswordRecovery
  },    
  {
    path: '/public/avalie-nos',
    name: 'RateUsView', 
    component: RateUsView
  },     
  {
    path: '/public/identify-device',
    name: 'IdentifyDevice', 
    component: IdentifyDeviceRedirect
  },      
  {
    path: '/system',
    name: 'SystemControlPlan',  
    component: SystemControlPlan
  },   
  {
    path: '/system/companies',
    name: 'SystemCompanyList2',  
    component: SystemCompanyList2
  },    
  {
    path: '/system/companies/actives',
    name: 'SystemCompaniesActives',  
    component: SystemCompaniesActives
  },      
  {
    path: '/system/companies/:_id/options',
    name: 'SystemCompanyOption', 
    component: SystemCompanyOption
  },      
  {
    path: '/system/companies/:_id',
    name: 'SystemCompanyApplyPlan', 
    component: SystemCompanyApplyPlan
  },       
  {
    path: '/system/users',
    name: 'SystemUserList', 
    component: SystemUserList
  },     
  {
    path: '/system/users/:_id',
    name: 'SystemUser', 
    component: SystemUser
  },   
  {
    path: '/system/payments',
    name: 'SystemPayments', 
    component: SystemPayments
  },    
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = storage.getToken();
  if(to.path.startsWith('/public')) {
    next()
  } else if(to.name !== 'Login' && to.name !== 'SignUp') {
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
