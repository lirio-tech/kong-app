import Axios from "axios";

const HOST_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/notifications';

export default{

    get(callback,errorCb){       
        let url = `${HOST_API}`;
        console.log(url);
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