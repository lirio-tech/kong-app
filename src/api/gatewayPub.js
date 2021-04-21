import Axios from 'axios';
//const PURCHASES_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/purchases';

export default {
    getPurchasesByCompany(companyId, callback, errorCb) {
        //let url = `${PURCHASES_API}/company/${companyId}`
        let url = `./purchases.json`
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },
    getPurchasesById(_id, callback, errorCb) {
        //let url = `${PURCHASES_API}/company/${companyId}`
        let url = `./purchase.json`
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })           
    }
}