import axios from 'axios'
import Vue from 'vue'
import storage from '../storage'
import appConfig from '../utils/appConfig'

const axiosRequestIntercept = () => {
    axios.interceptors.request.use(
        request => {
            let token = storage.getToken();
            if(token) {
                request.headers.Authorization = 'Bearer ' + token;
                request.headers['x-api-key'] = 'f2rnfa';
            }
            if(storage.getCompany()) {
              request.headers.Company = storage.getCompany()._id;
              request.headers.version = appConfig.version();
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
          console.log('response', error);
          if(error.response.status === 401) {
              storage.logout();
          }
          return new Promise((resolve, reject) => {
            reject(error);
          })
      }
    )
  }

Vue.use(axiosRequestIntercept)
Vue.use(axiosInterceptResponse)
