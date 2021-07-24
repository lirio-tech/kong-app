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
    }    
}