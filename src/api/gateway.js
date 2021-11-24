import Axios from "axios";

const ANALYTICS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/analytics';
const PAYMENT_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/payments-historic';
const AUTH_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/auth';
const USERS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users';
const USERS_BALANCE_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users-balance';
const RATE_US_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/rate-us';

export default{
    signIn(user, callback,errorCb){       
        let url = `${AUTH_API}/_/v2/signin`;
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
    getUsersByCompanyId(companyId, enabledType, callback, errorCb) {
        let url = `${USERS_API}/v2/company/${companyId}/?enabledType=${enabledType}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },        
    getUsersSite(companyId, callback, errorCb) {
        let url = `${USERS_API}/site/company/${companyId}/?enabledType=enabled`;
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
    updateCommission(users, callback, errorCb) {
        let url = `${USERS_API}/update/commission`;
        Axios.patch(url, users)
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
    getUsersBalance(callback, errorCb) {
        let url = USERS_BALANCE_API;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })                
    },      
    getUserBalanceByUserId(_userId, callback, errorCb) {
        let url = `${USERS_BALANCE_API}/user/${_userId}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })                
    },        
    getUserBalanceDetailExtractByUserId(_userId, callback, errorCb) {
        let url = `${USERS_BALANCE_API}/user/${_userId}/detail`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            });            
    },
    saveUserBalanceAndDetail(userBalanceDetail, callback, errorCb) {
        let url = `${USERS_BALANCE_API}`;
        Axios.post(url, userBalanceDetail)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            });            
    },
    deleteBalanceDebit(userBalanceId, userBalanceDetailId, callback, errorCb) {
        let url = `${USERS_BALANCE_API}/${userBalanceId}/${userBalanceDetailId}`;
        Axios.delete(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            });      
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
    getPaymentsHistByCompany(callback, errorCb) {
      let url = `${PAYMENT_API}?size=6`;
      Axios.get(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },
    getAllPaymentsHist(callback, errorCb) {
        let url = `${PAYMENT_API}/all`;
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
                  "description": "R$ 1000,00 por Mês de Lançamentos"
                },
                {
                    "icon": "mdi-clock",
                    "description": "30 agendamentos por mês"
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
              "name": "Simples",
              "type": "Mensal",
              "price": 9.90,
              "benefits": [
                {
                  "icon": "mdi-account",
                  "description": "2 Usuários (1 Admin + 1 Funcionário)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 3.000,00 por Mês de Lançamentos"
                },
                {
                    "icon": "mdi-clock",
                    "description": "300 agendamentos por mês"
                },
                {
                    "icon": "mdi-diamond",
                    "description": "1 Site"
                }        
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "cyan",
              "advantage": false,
              "pixCopyAndPast": "00020126530014BR.GOV.BCB.PIX0114+55119431974870213plano simples52040000530398654049.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512planosimples6304B630"
            },              
            {
              "name": "Top",
              "type": "Mensal",
              "price": 24.90,
              "benefits": [          
                {
                  "icon": "mdi-account",
                  "description": "6 Usuários (2 Admin + 4 Funcionários)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 10.000,00 por Mês de Lançamentos"
                },
                {
                    "icon": "mdi-clock",
                    "description": "Agendamentos Ilimitados"
                },
                {
                    "icon": "mdi-diamond",
                    "description": "1 Site"
                }     
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "green",
              "advantage": false,
              "pixCopyAndPast": "00020126490014BR.GOV.BCB.PIX0114+55119431974870209plano top520400005303986540524.905802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062120508planotop6304A5E1"
            },                                           
          ];
    },
}