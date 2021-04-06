import Axios from "axios";

const ANALYTICS_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/analytics';

export default{ 
    getPaymentsTypeByDateBetween(dates, callback, errorCb) {
        let url = `${ANALYTICS_API}/payments-type/${dates[0]}/${dates[1]}`;
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