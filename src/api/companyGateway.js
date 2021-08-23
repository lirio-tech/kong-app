import Axios from "axios";

const COMPANIES_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/companies';

export default{
    getCompanyById(_id, callback, errorCb) {
        let url = `${COMPANIES_API}/${_id}`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },      
    getCompanies(callback, errorCb) {
      let url = `${COMPANIES_API}`;
      Axios.get(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })        
    },   
    saveCompany(company, callback, errorCb)     {
      let url = `${COMPANIES_API}`;
      Axios.post(url, company)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })   
    },
    setPlanFreeCompany(companyId, callback, errorCb) {
      let url = `${COMPANIES_API}/${companyId}/downgrade-plan-free`;
      Axios.patch(url)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })         
    },
    applyPlan(companyId, plan, callback, errorCb) {
      let url = `${COMPANIES_API}/${companyId}/upgrade/plan`;
      Axios.put(url, plan)
          .then(data => {
              callback(data.data)
          })
          .catch(error => {
              console.log(error);
              errorCb(error)
          })      
    },
    savePlanCustom(planJsonString, callback, errorCb) {
        let url = `${COMPANIES_API}/plan-custom`;
        let plan = { plan: planJsonString };
        console.log('plan => ', plan);
        Axios.post(url, plan)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
    },
    saveCompanyService(companyId, service, callback, errorCb)     {
        let url = `${COMPANIES_API}/${companyId}/services`;
        Axios.post(url, service)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },
      updateCompanyService(companyId, serviceBeforeType, service, callback, errorCb)     {
        let url = `${COMPANIES_API}/${companyId}/services/${serviceBeforeType}`;
        Axios.patch(url, service)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },      
      deleteCompanyService(companyId, serviceType, callback, errorCb)     {
        let url = `${COMPANIES_API}/${companyId}/services/${serviceType}`;
        Axios.delete(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },
      getCompanySiteById(companyId, callback, errorCb) {
        let url = `${COMPANIES_API}/${companyId}/site-info`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },     
    saveCompanySite(companyId, copmanySite, callback, errorCb)     {
        let url = `${COMPANIES_API}/${companyId}/site-info`;
        Axios.put(url, copmanySite)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },       
}