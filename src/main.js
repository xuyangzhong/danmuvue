// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import URL from '../utils/Urls'
import {axios, Cookie} from './axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/iconfont/iconfont.css'
import global from './global/global'
import Vuex from 'Vuex'


Vue.config.productionTip = false;
Vue.prototype.URL = URL;


Vue.prototype.$http = axios
Vue.prototype.GLOBAL = global

Vue.prototype.Cookie = Cookie

Vue.use(Vuex)
Vue.use(iView);


const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      username: "",
      mobile: ""
    }
  },
  mutations: {

    setUser(state, user) {
      state.user = user;
      state.isLogin = true;
      sessionStorage.setItem("user",JSON.stringify(user))
      sessionStorage.setItem("isLogin","true")
    },
    removeUser(state) {
      state.user = {};
      state.isLogin = false;
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("isLogin")
    }
  },
  getters: {
    getUser: state => {

      if(!state.isLogin){
        state.isLogin = sessionStorage.getItem("isLogin")
        state.user = JSON.parse(sessionStorage.getItem("user"))
      }
      return state.user;
    },
    getLoginState: state => {
      if(!state.isLogin){
        state.isLogin = sessionStorage.getItem("isLogin")
        state.user = JSON.parse(sessionStorage.getItem("user"))
      }
      return state.isLogin;
    }
  }
})

//引入mockjs
require('./mock.js')


router.beforeEach((to, from, next) => {
  //防止重复点击
  var nowPath = from.path;
  console.log("nowPath : " + nowPath)
  if (to.path == nowPath) {
    // return
    // this.$router.go(0);
    // window.location.reload()
    return;
    // this.reload();
    // console.log("重复点击！")
    // return;
  }


  // let user = Cookie.get('user');
  let user = store.getters.getUser;
  if (user != null && user != {}) {
    // this.$store.commit("setUser", user);
    next();
    //已登录却想进入登录注册等界面，则定向回首页
    if (!to.meta.needLogin) {
      // this.$Message.error("请先退出登录!")
      next({
        path: "/index"
      })
    }
  } else {
    //  缓存中无登录信息
    if (to.meta.needLogin) {
      next({
        path: '/login',
      })
      // this.$Message.info('请先登录!')
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
