module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    themeColor: '#3399FF',
    name: 'Kong Barber', 
    workboxOptions: {
        skipWaiting: true
    }
  }    
}
