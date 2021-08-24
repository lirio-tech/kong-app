export default {
    urlCompany(companySite, companyType) {
        if(companySite.domainSync === true) {
            return companySite.domain +`/#/@/${companySite.arroba}`;  
        }            
        if(companySite.subdomainSync === true) {
            return companySite.arroba + (companyType === 'BARBER' ? '.kongbarber.com' : '.ladyapp.com.br') +`/#/@/${companySite.arroba}`;    
        }
        return (companyType === 'BARBER' ? 'app.kongbarber.com' : 'app.ladyapp.com.br') +`/#/@/${companySite.arroba}`;
    },
}