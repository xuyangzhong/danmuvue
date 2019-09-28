import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import UserLogin from '../components/UserLogin'

Vue.use(Router)

//跳转相同路径报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/login',
      },
      {
        path: '/login',
        component: UserLogin,
        meta: {
          needLogin: false
        }
      },
      {
        path: '/index',
        component: HelloWorld,
        meta: {
          needLogin: true
        }
      }
    ]
  }
)
