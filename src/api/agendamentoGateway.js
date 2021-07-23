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
    alterarAgendamento(_id, agendamento, callback, errorCb) {
        let url = `${AGENDAMENTO_API}/${_id}`;
        Axios.put(url, agendamento)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },    
    getAgendamentos(dtStart, dtEnd, callback, errorCb) {
        let url = `${AGENDAMENTO_API}/${dtStart}/${dtEnd}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })      
    },
    agendamentoDone(_id, agendamento, paymentType, callback, errorCb) {
        let url = `${AGENDAMENTO_API}/${_id}/${paymentType}`;
        Axios.post(url, agendamento)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })      
       
    },
    agendamentoCancelar(_id, callback, errorCb) {
        let url = `${AGENDAMENTO_API}/${_id}`;
        Axios.delete(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })      
       
    },
    getPriorAndNext(callback, errorCb) {
        let url = `${AGENDAMENTO_API}/prior-next`;
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