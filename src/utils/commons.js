export default {
    urlCompany(companySite, companyType) {
        if(companySite.domainSync === true) {
            return companySite.domain;  
        }            
        if(companySite.subdomainSync === true) {
            return companySite.arroba + (companyType === 'BARBER' ? '.kongbarber.com' : '.ladyapp.com.br');    
        }
        return (companyType === 'BARBER' ? 'app.kongbarber.com' : 'app.ladyapp.com.br') +`/#/@/${companySite.arroba}`;
    },  
}