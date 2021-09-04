import Axios from "axios";

const COMPANIES_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/companies';
const COMPANIES_SITE_API =  process.env.VUE_APP_HOST_API + '/.netlify/functions/api/companies-site';

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
        let url = `${COMPANIES_SITE_API}/${companyId}/site-info`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },     
    getCompanySiteByArroba(arroba, callback, errorCb) {
        let url = `${COMPANIES_SITE_API}/${arroba}/site-info/arroba`;
        Axios.get(url)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })        
    },
    getCompanySiteDiscoveryByWindowLocation(hostname, callback, errorCb) {
        let url = `${COMPANIES_SITE_API}/site-info/discovery/origin/app/?hostname=${hostname}`;
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
        let url = `${COMPANIES_SITE_API}/${companyId}/site-info`;
        Axios.put(url, copmanySite)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },       
      updateCompanySite(companyId, _idSite, copmanySite, callback, errorCb)     {
        let url = `${COMPANIES_SITE_API}/${companyId}/site-info/${_idSite}`;
        Axios.patch(url, copmanySite)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })   
      },          
      uploadPhotoCover(sitePhotoCover, callback, errorCb) {
        let url = `${COMPANIES_SITE_API}/site-info/${sitePhotoCover._siteId}/upload-cover`;
        Axios.patch(url, sitePhotoCover)
            .then(data => {
                callback(data.data)
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })               
      },
      uploadPhotoGallery(siteId, photoGalleryId, photoGalley, callback, errorCb) {
        let url = `${COMPANIES_SITE_API}/site-info/${siteId}/upload-photo-gallery/${photoGalleryId}`;
        Axios.patch(url, photoGalley)
            .then(data => {
                callback(data.data) 
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })               
      },
      saveCompanyPaymentTypes(companyId, companyPaymentTypes, callback, errorCb) {
        let url = `${COMPANIES_SITE_API}/${companyId}/payment-types`;
        Axios.patch(url, companyPaymentTypes)
            .then(data => {
                callback(data.data) 
            })
            .catch(error => {
                console.log(error);
                errorCb(error)
            })            
      }     
}