import Axios from "axios";

const AGENDAMENTO_API = process.env.VUE_APP_HOST_API + '/.netlify/functions/api/schedules';

export default{ 
    registrarAgendamento(agendamento, callback, errorCb) {
        let url = `${AGENDAMENTO_API}`;
        Axios.post(url, agendamento)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },
    getAgendamentos(dtStart, dtEnd, callback, errorCb) {
        let url = `${ANALYTICS_API}/${dtStart}/${dtEnd}`;
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