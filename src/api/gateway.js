import Axios from "axios";

const ORDERS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/orders';
const COMPANIES_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/companies';
const ANALYTICS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/analytics';
const PAYMENT_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/payments-historic';
const AUTH_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/auth';
const USERS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users';
const RATE_US_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/rate-us';

export default{
    signIn(user, callback,errorCb){       
        let url = `${AUTH_API}/signin`;
        console.log(url);
        Axios.post(url, user)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error);
            })
    },       
    signUp(user, callback,errorCb){       
        let url = AUTH_API+'/signup';
        console.log(url);
        Axios.post(url, user)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error);
            })
    },     
    signUpWithCompanyAndUser(signup, callback,errorCb){       
      let url = `${AUTH_API}/signup/company`;
      console.log(url);
      Axios.post(url, signup)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error);
          })
    },         
    getOrdersByDataBetween(dataInicio,dataFim,user,callback,errorCb){       
        let url = ORDERS_API+'/'+dataInicio+'/'+dataFim+'?username='+user.username+'&usertype='+user.type+'&company='+user.company;
        console.log(url);
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })
    },
    saveOrder(order, callback, errorCb) {
        let url = `${ORDERS_API}/v5`;
        Axios.post(url, order)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },
    deleteOrder(_id, callback, errorCb) {
        let url = ORDERS_API+'/'+_id;
        Axios.delete(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },    
    getOrderById(_id, callback, errorCb) {
        let url = ORDERS_API+'/'+_id;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },    
    getUserByUsername(username, callback, errorCb) {
        let url = USERS_API+'/'+username;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },    
    newRecoveryCode(_userId, callback, errorCb) {
      let url = `${USERS_API}/${_userId}/recovery`;
      Axios.post(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })  
    },
    getUserByRecoveryCode(code, callback, errorCb) {
      let url = `${USERS_API}/recovery/${code}`;
      Axios.patch(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })        
    },    
    updateConfigurationUser(_userId, configuration, callback, errorCb) {
      let url = `${USERS_API}/${_userId}/configuration`;
      Axios.patch(url, configuration)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          }) 
    },
    recoveryUpdatePassword(recPass, callback, errorCb) {
      let url = `${AUTH_API}/recovery`;
      Axios.patch(url, recPass)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })          
    },    
    getUserById(_id, callback, errorCb) {
        let url = `${USERS_API}/_/${_id}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },            
    getUsers(enabledType, callback, errorCb) {
        let url = `${USERS_API}/?enabledType=${enabledType}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },         
    updateUser(_id, user, callback, errorCb) {
        let url = `${USERS_API}/${_id}`;
        Axios.patch(url, user)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })                
    },    
    becomeUserAdmin(_idUser, callback, errorCb) {
      let url = `${USERS_API}/${_idUser}/become-admin`;
      Axios.patch(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },
    becomeUserCommon(_idUser, callback, errorCb) {
      let url = `${USERS_API}/${_idUser}/become-common`;
      Axios.patch(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },    
    UpdatePassword(_idUser, userPasswords, callback, errorCb) {
        let url = USERS_API+'/'+_idUser;
        Axios.patch(url, userPasswords)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })                
    },
    changePassword(_idUser, userChangePassword, callback, errorCb) {
        let url = `${USERS_API}/${_idUser}/change-password`;
        Axios.patch(url, userChangePassword)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })                
    },    
    getCompanyById(_id, callback, errorCb) {
        let url = `${COMPANIES_API}/${_id}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },      
    getCompanies(callback, errorCb) {
      let url = `${COMPANIES_API}`;
      Axios.get(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })        
    },   
    saveCompany(company, callback, errorCb)     {
      let url = `${COMPANIES_API}`;
      Axios.post(url, company)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })   
    },
    setPlanFreeCompany(companyId, callback, errorCb) {
      let url = `${COMPANIES_API}/${companyId}/downgrade-plan-free`;
      Axios.patch(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },
    applyPlan(companyId, plan, callback, errorCb) {
      let url = `${COMPANIES_API}/${companyId}/upgrade/plan`;
      Axios.put(url, plan)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })      
    },
    rateUs(rateUs, callback, errorCb) {
      let url = `${RATE_US_API}`;
      Axios.post(url, rateUs)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })      
    },  
    getAllRatedUs(callback, errorCb) {
      let url = `${RATE_US_API}`;
      Axios.get(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })      
    },      
    getPaymentsHist(callback, errorCb) {
      let url = `${PAYMENT_API}`;
      Axios.get(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },
    getDaysOfTheWeek(dates, callback, errorCb) {
      let url = `${ANALYTICS_API}/days-of-the-week`;
      Axios.post(url, dates)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })   
    },
    getAnalyticsDataUsers(dates, callback, errorCb) {
      let url = `${ANALYTICS_API}/users`;
      Axios.post(url, dates)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })   
    },
    getAnalyticsCompaniesActives(dates, callback, errorCb) {
      let url = `${ANALYTICS_API}/companies-actives`;
      Axios.post(url, dates)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })   
    },
    savePlanCustom(planJsonString, callback, errorCb) {
        let url = `${COMPANIES_API}/plan-custom`;
        let plan = { plan: planJsonString };
        console.log('plan => ', plan);
        Axios.post(url, plan)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
    },
    getAllPlans() {
        return [
            {
              "name": "Free",
              "type": "Free",
              "price": 0.00,
              "benefits": [
                {
                  "icon": "mdi-account",
                  "description": "1 Usuário Admin"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 500,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Voltar para o Plano Free",
                "icon": ""
              },
              "color": "gray",
              "advantage": false
            },
            {
              "name": "Basico",
              "type": "Mensal",
              "price": 9.90,
              "benefits": [
                {
                  "icon": "mdi-account",
                  "description": "2 Usuários (1 Admin + 1 Comum)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 2.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "blue",
              "advantage": false,
              "pixCopyAndPast": "00020126660014BR.GOV.BCB.PIX0111353576598690229KongBarber-PlanoPremiumBascio52040000530398654049.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUbEjC3K1y9t63040DA2"             
            },         
            {
              "name": "Gold",
              "type": "Anual",
              "price": 99.90,
              "benefits": [
                {
                  "icon": "mdi-cash",
                  "description": "Mesmo modelo do Plano Basico sendo R$ 8,32 por Mês"
                },              
                {
                  "icon": "mdi-account",
                  "description": "2 Usuários (1 Admin + 1 Comum)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 4.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "#d4af37",
              "advantage": true,
              "pixCopyAndPast": "00020126640014BR.GOV.BCB.PIX0111353576598690227KongBarber-PlanoPremiumGold520400005303986540599.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUJvbhtX80b16304B9D1"              
            },        
            {
              "name": "É Nóis",
              "type": "Mensal",
              "price": 21.90,
              "benefits": [          
                {
                  "icon": "mdi-account",
                  "description": "6 Usuários (2 Admin + 4 Comuns)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 6.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "cyan",
              "advantage": false,
              "pixCopyAndPast": "00020126660014BR.GOV.BCB.PIX0111353576598690229KongBarber-PlanoPremiumEhNoiz520400005303986540521.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NU3EgBD45bdL6304F0BA"
            },        
            {
              "name": "Tamo Junto",
              "type": "Anual",
              "price": 199.90,
              "benefits": [          
                {
                  "icon": "mdi-cash",
                  "description": "Mesmo Plano É Nóis sendo R$ 16,65 por Mês"
                },              
                {
                  "icon": "mdi-account",
                  "description": "6 Usuários (2 Admin + 4 Comuns)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 10.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "orange",
              "advantage": true,
              "pixCopyAndPast": "00020126620014BR.GOV.BCB.PIX0111353576598690225KongBarber-PlanoTamoJunto5204000053039865406199.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUc6nHIvbCiH6304DCEF"
            },           
            // {
            //   "name": "Infinity",
            //   "type": "Infinity",
            //   "price": 900.00,
            //   "benefits": [         
            //     {
            //       "icon": "mdi-cash",
            //       "description": "Pague uma única vez e utilize o App sempre que quiser"
            //     },                        
            //     {
            //       "icon": "mdi-account",
            //       "description": "8 Usuários (3 Admin + 5 Comuns)"
            //     },
            //     {
            //       "icon": "mdi-content-cut",
            //       "description": "R$ 25.000,00 por Mês de Lançamentos"
            //     }
            //   ],
            //   "button": {
            //     "label": "Quero Esse",
            //     "icon": "mdi-rocket-launch"
            //   },
            //   "color": "purple",
            //   "advantage": false,
            //   "pixCopyAndPast": "00020126580014BR.GOV.BCB.PIX01366c1296f1-b36f-4b65-ac9c-5e7fd16cafb75204000053039865406900.005802BR5925DIEGO LIRIO DAMACENA PERE6009SAO PAULO622605226QEcoMRRZQlpCuF55gqxtO63047BBF"              
            // },                                     
          ];
    }       
}