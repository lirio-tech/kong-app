export default {
    getCompany() {
        if(localStorage.getItem('company')) {
            return JSON.parse(localStorage.getItem('company'));
        }
        return null;
    },
    setCompany(company) {
        localStorage.setItem('company', JSON.stringify(company));
    }
}