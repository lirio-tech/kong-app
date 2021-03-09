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
        <div 
            class="overline green--text" 
            align="center"
            dark
            v-if="showBtnPlanDialog"
        >                            
            <v-btn  
                small 
                color="primary"
                @click="$emit('show-plan-dialog',true)"
            >
                Veja o plano ideal para VC ;-)
            </v-btn>
            <br/>
        </div>            
        <v-container>
                <span 
                    v-if="company.plan && company.plan.payment"
                >
                    <br/>
                    <span class="grey--text">Pagamento: </span> 
                    {{ company.plan.payment.price | currency }} 
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
                    {{ company.plan.name === 'Free' ? 500 : company.plan.maxCash | currency }} 
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
export default {
    props: ['company', 'showBtnPlanDialog'],
}
</script>