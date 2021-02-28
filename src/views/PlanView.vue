<template>
    <div >
        <Plan />    
        <router-link to="/" style="color: inherit; text-decoration: none">
            <v-btn
                dark
                style="width: 100%"
            >
                <v-icon left>
                    mdi-arrow-left
                </v-icon>
                Voltar
            </v-btn>          
        </router-link>
    </div>
</template>
<script>
import Plan from '../components/Plan'
export default {
    components: {
        Plan
    }
}
</script>