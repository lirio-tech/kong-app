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
        localStorage.setItem('company', JSON.stringify(company));
    },    
    getCompany() {
        if(localStorage.getItem('company')) {
            return JSON.parse(localStorage.getItem('company'));
        }
        return null;
    },
    setThemeLadyModoON(isLadyModoON) {
        localStorage.setItem('THEME_LADY', isLadyModoON);
    },
    getThemeLadyModoON() {
        return localStorage.getItem('THEME_LADY');
    },
    logout() {
        //localStorage.clear();
        localStorage.removeItem('company');
        localStorage.removeItem('user');
        localStorage.removeItem('TOKEN');
    }
}