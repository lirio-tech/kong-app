const HAIRDRESSER = 'hairdresser';
const ADMINISTRATOR = 'administrator';
const SYS_ADMIN = 'sys_admin';

const types = {
    isAdmin(userType) {
        return userType === ADMINISTRATOR ||
               userType === SYS_ADMIN;
    },
    getDescriptionPtBR(type) {
        if(type === ADMINISTRATOR) {
            return 'Administrador';
        } 
        if(type === HAIRDRESSER) {
            return 'Funcionário';
        }
        return type;  
    }
}


export default types;