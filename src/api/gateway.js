import Axios from "axios";

const ORDERS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/orders';
// const CLIENTES_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/clientes';
// const PEDIDOS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/pedidos';
// const AUTH_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/auth';
// const USERS_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/users';

export default{
    getOrdersByDataBetween(dataInicio,dataFim,callback,errorCb){       
        //let url = ORDERS_API+'/'+dataInicio+'/'+dataFim;
        let url = ORDERS_API;
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
        let url = ORDERS_API;
        Axios.post(url, order)
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
}