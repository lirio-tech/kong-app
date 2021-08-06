<template>
    <div>
      <v-card v-if="company">
        <div 
            class="green--text" 
            align="center" style="font-size: 1.4rem"
            dark
        >
            <br />
            Seu Plano Atual é o {{ company.plan.name === 'Custom' ? 'Personalizado' : company.plan.name  }}
        </div>        
        <v-container>
                <span 
                    v-if="company.plan && company.plan.payment && isAdmin(userView.type)"
                >
                    <span class="grey--text">Pagamento: </span> 
                    R$ {{ company.plan.payment.price | currency }} 
                </span>     
                <span 
                    v-if="company.plan && company.plan.name !== 'Free' && company.plan.name !== 'Infinity'"
                >
                    <br/>
                    <span class="grey--text">Vencimento do Plano: </span> 
                    {{ new Date(company.plan.dateEnd).toLocaleDateString('pt-BR') }} 
                </span>       
                <span 
                    v-if="company.plan"
                >
                    <br/>
                    <span class="grey--text">Valor/Mes: </span> 
                    R$ {{ company.plan.name === 'Free' ? 500 : company.plan.maxCash | currency }} 
                </span>     
                <span 
                    v-if="company.plan"
                >
                    <br/>
                    <span class="grey--text">Numero Max de Usuarios: </span> 
                    {{ company.plan.name === 'Free' ? 1 : company.plan.amountUsers }} 
                </span>                                                           
                <span 
                    v-if="company.plan"
                >
                    <br/>
                    <span class="grey--text">Usuarios Admin: </span> 
                    {{ company.plan.name === 'Free' ? 1 : company.plan.amountUsersAdmin }} 
                </span>                        
                <span 
                    v-if="company.plan"
                >
                    <br/>
                    <span class="grey--text">Usuarios Comum: </span> 
                    {{ company.plan.name === 'Free' ? 0 : company.plan.amountUsersCommon }} 
                </span>        
                <br/>
        </v-container>         
      </v-card>  
    </div>
</template>
<script>
import UserTypes from '../utils/UserTypes'
export default {
    props: ['company', 'userView'],
    methods: {
        isAdmin(type) {
            return UserTypes.isAdmin(type)
        }
    }
}
</script>