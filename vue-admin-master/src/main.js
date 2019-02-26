import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//import Mock from './mock'
//Mock.bootstrap();
import axios from 'axios'  // 引入axios依赖,和引入vue一样
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI); // 在vue环境中引入ElementUI
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

//easy-mock:做模拟服务端:不要再拼接了,这是一个全局配置,会在axios的所有请求都加这个前缀
// https://www.easy-mock.com/mock/5c74c4b5261e0e3c3307e3ce/employee
axios.defaults.baseURL=" https://www.easy-mock.com/mock/5c74c4b5261e0e3c3307e3ce/employee";
///aigou/employee/employee/login
Vue.prototype.$http = axios
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

