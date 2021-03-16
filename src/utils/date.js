export default {
    dateToStringPtBR(date) {
        return date.toLocaleString('pt-BR');
    },
    dateToStringEnUS(date) {
        const [day, month, year] = date.toLocaleString('pt-BR').substring(0,10).split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    getNewDateAddDay(_day) {
        let date = new Date();
        console.log(date.setDate(date.getDate()+_day));
        const [day, month, year] = date.toLocaleString('pt-BR').substring(0,10).split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
}