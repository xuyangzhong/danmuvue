import axios from "axios"
import global from './global/global'
import Cookie from "js-cookie"

axios.defaults.withCredentials = true;
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = global.BaseUrl
axios.interceptors.request.use(
  config => {
    var token = '';
    // if (Cookie.get('user')  == null || typeof Cookie.get('user') === 'undefined') {
    //   //未找到cookies中的user
    // } else {
    //   token = JSON.parse(Cookies.get('user')).token
    // }
    config.headers = {
      'Content-Type': 'application/json'
    };
    return config;
  },
  error => {
    return Promise.reject(err);
  }
)

export {axios,Cookie}
