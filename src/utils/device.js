export default {
    isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    },
    isAndroid() {
        if(/Android/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    },        
    isIphone() {
        if(/iPhone|iPad/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    },
    agent() {
        return navigator.userAgent;
    },    
}