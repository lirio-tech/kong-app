import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp'
import Home from '../views/Home'
import Perfil from '../views/Perfil'
import OrdemServico from '../views/order/OrdemServico'
import OrdersList from '../views/order/OrdersList'
import UsuarioList from '../views/UsuarioList'
import UsuarioForm from '../views/UsuarioForm'
import ContactUs from '../views/ContactUs'
import Help from '../views/Help' 
import Android from '../views/Android'
import IPhone from '../views/IPhone'
import PaymentPremium from '../views/PaymentPremium'
import PaymentFree from '../views/PaymentFree'
import IdentifyDeviceRedirect from '../views/IdentifyDeviceRedirect'
import BackofficeCompanyApplyPlan from '../bounded-context/backoffice/views/BackofficeCompanyApplyPlan'
import BackofficeCompanyOption from '../bounded-context/backoffice/views/BackofficeCompanyOption'
import BackofficeControlPlan from '../bounded-context/backoffice/views/BackofficeControlPlan'
import BackofficeCompanyList2 from '../bounded-context/backoffice/views/BackofficeCompanyList2'
import BackofficeCompaniesActives from '../bounded-context/backoffice/views/BackofficeCompaniesActives'
import BackofficeUserList from '../bounded-context/backoffice/views/BackofficeUserList'
import BackofficeUser from '../bounded-context/backoffice/views/BackofficeUser'
import BackofficePayments from '../bounded-context/backoffice/views/BackofficePayments'
import BackofficeRateUsList from '../bounded-context/backoffice/views/BackofficeRateUsList'
import BackofficeNotificationOptions from '../bounded-context/backoffice/notifications/views/BackofficeNotificationOptions'
import BackofficeNotificationList from '../bounded-context/backoffice/notifications/views/BackofficeNotificationList'
import Analytics from '../views/Analytics'
import storage from '../storage'
import PasswordRecovery from '../views/PasswordRecovery'
import RateUsView from '../views/RateUsView' 
import SimulatorPlan from '../views/SimulatorPlan'
import PurchasesProductsList from '../views/PurchasesProductsList'
import PurchasesProductsForm from '../views/PurchasesProductsForm'
import UsersBalance from '../views/UsersBalance'
import UserBalanceDetail from '../views/UserBalanceDetail'
import Agendamentos from '../bounded-context/schedule/views/Agendamentos'
import AgendamentosAdmin from '../bounded-context/schedule/views/AgendamentosAdmin'
import CompanySite from '../views/CompanySite'


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
    name: 'PaymentPremium', 
    component: PaymentPremium
  },    
  {
    path: '/admin/payment-free',
    name: 'PaymentFree', 
    component: PaymentFree
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
    path: '/orders',
    name: 'OrdersList',
    component: OrdersList
  },
  {
    path: '/ordem-servico/:_id',
    name: 'EditOrdemServico',
    component: OrdemServico
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
    path: '/public/simulator-plan',
    name: 'SimulatorPlan', 
    component: SimulatorPlan
  },     
  {
    path: '/system',
    name: 'BackofficeControlPlan',  
    component: BackofficeControlPlan
  },   
  {
    path: '/system/companies',
    name: 'BackofficeCompanyList2',  
    component: BackofficeCompanyList2
  },    
  {
    path: '/system/companies/actives',
    name: 'BackofficeCompaniesActives',  
    component: BackofficeCompaniesActives
  },      
  {
    path: '/system/companies/:_id/options',
    name: 'BackofficeCompanyOption', 
    component: BackofficeCompanyOption
  },      
  {
    path: '/system/companies/:_id',
    name: 'BackofficeCompanyApplyPlan', 
    component: BackofficeCompanyApplyPlan
  },       
  {
    path: '/:companyId/system/users',
    name: 'BackofficeUserList', 
    component: BackofficeUserList
  },     
  {
    path: '/system/rated-us',
    name: 'BackofficeRateUsList', 
    component: BackofficeRateUsList
  },     

  {
    path: '/system/users/:_id',
    name: 'BackofficeUser', 
    component: BackofficeUser
  },   
  {
    path: '/system/payments',
    name: 'BackofficePayments', 
    component: BackofficePayments
  },    
  {
    path: '/backoffice/notifications',
    name: 'BackofficeNotificationOptions', 
    component: BackofficeNotificationOptions
  },      
  {
    path: '/backoffice/notifications/s',
    name: 'BackofficeNotificationList', 
    component: BackofficeNotificationList
  },        
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  },
  {
    path: '/admin/purchases-products',
    name: 'PurchasesProductsList',
    component: PurchasesProductsList
  },
  {
    path: '/admin/purchases-products/:_id',
    name: 'PurchasesProductsForm',
    component: PurchasesProductsForm
  },
  {
    path: '/users-balance',
    name: 'UsersBalance',
    component: UsersBalance
  },
  {
    path: '/users-balance-detail/:userId',
    name: 'UserBalanceDetail',
    component: UserBalanceDetail
  },
  {
    path: '/agendamentos',
    name: 'Agendamentos',
    component: Agendamentos
  },  
  {
    path: '/admin/agendamentos',
    name: 'AgendamentosAdmin',
    component: AgendamentosAdmin
  },   
  {
    path: '/@/:arroba',
    name: 'SiteCompany',
    component: CompanySite
  },     
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = storage.getToken();
  if(to.path.startsWith('/public') || to.path.startsWith('/@/')) {
    next()
  } else if(to.name !== 'Login' && to.name !== 'SignUp') {
    console.log(token);
    if (token || to.name === 'Login') {
      next()
    } else {
      next({name: 'SignUp'})
    } 
  } else {
    next()
  }
}
);

export default router
