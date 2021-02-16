import Axios from "axios";

const ORDERS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/orders';
// const CLIENTES_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/clientes';
// const PEDIDOS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/pedidos';
const AUTH_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/auth';
const USERS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users';

export default{
    signIn(user, callback,errorCb){       
        let url = AUTH_API+'/signin';
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
    getOrdersByDataBetween(dataInicio,dataFim,user,callback,errorCb){       
        let url = ORDERS_API+'/'+dataInicio+'/'+dataFim+'?username='+user.username+'&usertype='+user.type;
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
    }    
}