export default {
    usernameInputs(value) {
        let v = String(value);
        v=v.replace(/[^a-zA-Z0-9]/g, "");
        return v;        
    },
    maskCurrency(value) {
        let v = String(value);
        v=v.replace(/\D/g,""); //Remove tudo o que não é numero
        v=String(Number(v));
        v=v.replace(/(\d)(\d{8})$/,"$1.$2"); //coloca o ponto dos milhões
        v=v.replace(/(\d)(\d{5})$/,"$1.$2"); //coloca o ponto dos milhares
        v=v.replace(/(\d)(\d{2})$/,"$1,$2"); //coloca a virgula antes dos 2 últimos dígitos
        return v;
    },       
}