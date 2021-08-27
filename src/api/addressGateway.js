import Axios from "axios";

const ADDRESS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/address';

export default{
    getAddreesByCep(cep, callback, errorCb) {
        let url = ADDRESS_API+`/cep/${cep}`;
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