module.exports = {
  runtimeCompiler: true,
//   "transpileDependencies": [
//     "vuetify"
//   ],
  pwa: {
    themeColor: '#3399FF',
    name: 'Kongapp', 
    workboxOptions: {
        skipWaiting: true
    }
  }    
}
