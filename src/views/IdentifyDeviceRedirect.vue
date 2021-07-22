<template>
    <v-container>
        <AppBar />
        <v-row style="margin-top:100px;">
            <v-container class="text-center">
                <v-progress-circular
                    :rotate="-90"
                    :size="100"
                    :width="15"
                    :value="value"
                    color="primary"
                >
                    {{ value }}
                </v-progress-circular>        
                <span v-if="value > 40">{{ myDevice }}</span>
            </v-container>
        </v-row>
    </v-container>
</template>
<script>
import AppBar from '../components/AppBar';
import device from '../utils/device'
export default {
    components: { AppBar },
    data () {
      return {
        interval: {},
        value: 0,
        myDevice: null
      }
    },    
    beforeMount () {
      clearInterval(this.interval);
      if(device.isAndroid()) {
          this.myDevice = 'ANDROID';
      }
      if(device.isIphone()) {
          this.myDevice = 'IPHONE';
      }      
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
            if(this.myDevice === 'ANDROID') {
                //this.$router.push('/public/android');
                window.location.href = 'https://play.google.com/store/apps/details?id=com.konglify.app.ladyapp'
                return;
            }
            if(this.myDevice === 'IPHONE') {
                this.$router.push('/public/iphone');
                return;
            }                
            this.$router.push('/public/help');
        }
        this.value += 10
      }, 250)
    },     
} 
</script>