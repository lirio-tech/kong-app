export default {
    urlCompany(companySite) {
        if(companySite.domainSync === true) {
            return companySite.domain;  
        }            
        if(companySite.subdomainSync === true) {
            return companySite.arroba + '.kongapp.com.br';    
        }
        return `app.kongapp.com.br/#/@/${companySite.arroba}`;
    },  
}