export default {
    setToken(token) {
        localStorage.setItem('TOKEN', token);
    },
    getToken() {
        return localStorage.getItem('TOKEN'); 
    },    
    setUserLogged(userLogged) {
        localStorage.setItem('user', userLogged);
    },    
    getUserLogged() {
        return JSON.parse(localStorage.getItem('user'));
    },
    setCompany(company) {
        localStorage.setItem('company', company);
    },    
    getCompany() {
        if(localStorage.getItem('company')) {
            return JSON.parse(localStorage.getItem('company'));
        }
        return null;
    },
    setCompanySite(site) {
        localStorage.setItem('company-site', site);
    },    
    getCompanySite() {
        if(localStorage.getItem('company-site')) {
            return JSON.parse(localStorage.getItem('company-site'));
        }
        return null;
    },    
    setThemeKong(isKong) {
        localStorage.setItem('THEME_KONG', isKong);
    },
    getThemeKong() {
        return localStorage.getItem('THEME_KONG');
    },
    logout() {
        //localStorage.clear();
        localStorage.removeItem('company');
        localStorage.removeItem('user');
        localStorage.removeItem('TOKEN');
    },
    setPlanCustom(planCustom) {
        localStorage.setItem('planCustom', planCustom);
    },
    getPlanCustom() {
        return JSON.parse(localStorage.getItem('planCustom'));
    },   
    incrementButton(number) {
        localStorage.setItem('INC_BTN', String(number));
    },    
    getIncrementButton() {
        return Number(localStorage.getItem('INC_BTN'));
    },    
    setCustomerSiteAgendamento(customerSite) {
        localStorage.setItem('customerSiteAgendamento', JSON.stringify(customerSite));
    },    
    getCustomerSiteAgendamento() {
        if(localStorage.getItem('customerSiteAgendamento')) { 
            return JSON.parse(localStorage.getItem('customerSiteAgendamento'));
        }
        return null;
    },
} 