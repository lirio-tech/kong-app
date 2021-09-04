import Axios from "axios";

const ORDERS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/orders';

export default{

    getOrdersByDataBetween(
        dataInicio, dataFim, user, pageNumber, numberPerPage, callback,errorCb
    ){       
        let url = `${ORDERS_API}/v2/${dataInicio}/${dataFim}?username=${user.username}&usertype=${user.type}&company=${user.company}&pageNumber=${pageNumber}&numberPerPage=${numberPerPage}`;
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
    getOrdersSummaryByDataBetween(dataInicio,dataFim,callback,errorCb){       
        let url = `${ORDERS_API}/v3/summary/${dataInicio}/${dataFim}`; 
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
        let url = `${ORDERS_API}/v9`;
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
}