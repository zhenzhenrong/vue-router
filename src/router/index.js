import Vue from 'vue'
import VueRouter from './vue-router'
import routes from './routes';
//VueRouter 是一个类

Vue.use(VueRouter);
export default new VueRouter ({
    mode: 'hash', // #/hash  /history
    routes
})
//路由里面 主要mode
//router-link router-view
//this.$router this.$route
//Vue.use注册插件
