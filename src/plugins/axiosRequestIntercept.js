import axios from 'axios'
import Vue from 'vue'

const axiosRequestIntercept = () => {
    axios.interceptors.request.use(
        request => {
            let token = localStorage.getItem('TOKEN');
            if(token) {
                request.headers.Authorization = 'Bearer ' + token;
            }
            return request;
        },
        error => {
            return Promise.reject(error)
        }
    )
}

const axiosInterceptResponse = () => {
    axios.interceptors.response.use(
      response => {
        console.log('response', response.status);
        return response;
      },
      error => {  
          console.log('response', error.response);
          if(error.response.status === 403) {
              localStorage.clear();
          }
          return new Promise((resolve, reject) => {
            reject(error);
          })
      }
    )
  }

Vue.use(axiosRequestIntercept)
Vue.use(axiosInterceptResponse)
