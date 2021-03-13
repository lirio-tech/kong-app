import Axios from "axios";

const ORDERS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/orders';
const COMPANIES_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/companies';
//const PLANS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/plans';
const AUTH_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/auth';
const USERS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users';

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
        let url = `${ORDERS_API}/v2`;
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
    // getAllPlans(callback, errorCb) {
    //     let url = PLANS_API;
    //     Axios.get(url)
    //         .then(data => {
    //             callback(data.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             errorCb(error)
    //         })                
    // },
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
              "price": 10.00,
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
              "pixCopyAndPast": "00020126720014BR.GOV.BCB.PIX0111353576598690235WiskritorioApp-Plano Premium Basico520400005303986540510.005802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUAdeHEok7F463047A09"             
            },         
            {
              "name": "Gold",
              "type": "Anual",
              "price": 90.00,
              "benefits": [
                {
                  "icon": "mdi-cash",
                  "description": "Mesmo modelo do Plano Basico sendo R$ 7,50 por Mês"
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
              "pixCopyAndPast": "00020126710014BR.GOV.BCB.PIX0111353576598690234Wiskritorio APP - Plano Gold anual520400005303986540590.005802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUAZ7l8FqpBH63043CE7"              
            },        
            {
              "name": "É Nóis",
              "type": "Mensal",
              "price": 20.00,
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
              "pixCopyAndPast": "00020126680014BR.GOV.BCB.PIX0111353576598690231Wiskritorio APP - Plano Eh Nois520400005303986540520.005802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUGeBHB6SWFt63040E1F"              
            },        
            {
              "name": "Tamo Junto",
              "type": "Anual",
              "price": 180.00,
              "benefits": [          
                {
                  "icon": "mdi-cash",
                  "description": "Mesmo Plano É Nóis sendo R$ 15,00 por Mês"
                },              
                {
                  "icon": "mdi-account",
                  "description": "6 Usuários (2 Admin + 4 Comuns)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 12.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "orange",
              "advantage": true,
              "pixCopyAndPast": "00020126710014BR.GOV.BCB.PIX0111353576598690234Wiskritorio APP - Plano Tamo Junto5204000053039865406180.005802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUXWKzxEUVI763041B58"              
            },           
            {
              "name": "Infinity",
              "type": "Infinity",
              "price": 900.00,
              "benefits": [         
                {
                  "icon": "mdi-cash",
                  "description": "Pague uma única vez e utilize o App sempre que quiser"
                },                        
                {
                  "icon": "mdi-account",
                  "description": "8 Usuários (3 Admin + 5 Comuns)"
                },
                {
                  "icon": "mdi-content-cut",
                  "description": "R$ 25.000,00 por Mês de Lançamentos"
                }
              ],
              "button": {
                "label": "Quero Esse",
                "icon": "mdi-rocket-launch"
              },
              "color": "purple",
              "advantage": false,
              "pixCopyAndPast": "00020126580014BR.GOV.BCB.PIX01366c1296f1-b36f-4b65-ac9c-5e7fd16cafb75204000053039865406900.005802BR5925DIEGO LIRIO DAMACENA PERE6009SAO PAULO622605226QEcoMRRZQlpCuF55gqxtO63047BBF"              
            },                                     
          ];
    }       
}