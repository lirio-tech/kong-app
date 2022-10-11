import Axios from "axios";

const HOST_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/notifications';

export default{

    get(callback,errorCb){       
        let url = `${HOST_API}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })
    },
    updateNotificationRead(_id, callback, errorCb) {
        let url = `${HOST_API}/${_id}`;
        Axios.patch(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })
    },
    verifyAndSaveSignatureExpiration(callback, errorCb) {
        let url = `${HOST_API}/signature-expiration`;
        Axios.post(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })
    }    
}