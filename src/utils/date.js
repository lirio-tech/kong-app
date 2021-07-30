export default {
    dateToStringPtBR(date) {
        return date.toLocaleString('pt-BR').substring(0,10);
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
    getDayOfWeekToday(date) {
        let today = new Date().setHours(0,0,0,0);
        let date2 = date.setHours(0,0,0,0);
        if(date2 == today) {
          return 'Hoje'
        }
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        if(date2 == tomorrow.setHours(0,0,0,0)) {
          return 'Amanhã'
        }        
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        if(date2 == yesterday.setHours(0,0,0,0)) {
          return 'Ontem'
        }            
        switch(date.getDay()) {
          case 0: return 'Domingo';
          case 1: return 'Segunda-feira';
          case 2: return 'Terça-feira';
          case 3: return 'Quarta-feira';
          case 4: return 'Quinta-feira';
          case 5: return 'Sexta-feira';
          case 6: return 'Sábado';
          default: return ''
        }        
    }
}