class HistoryRoute {
    constructor(){
        this.current = null;
    }
}
class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        //传递的路由表为数组，需转化为{'/home': Home, '/about': About}
        this.routesMape = this.createMap(this.routes);
        // console.log(this.routesMape);
        //路由需要存放当前路径 需要状态
        this.history = new HistoryRoute();
        this.init(); //初始化
    }
    init(){
        //判断模式
        if(this.mode === 'hash'){
            //先判断用户打开时有没有hash 没有就跳转到#/
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load', ()=>{
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener('hashchange', ()=>{
                this.history.current = location.hash.slice(1);
            });
        }else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', ()=>{
                this.history.current = location.pathname;
            });
            window.addEventListener('popstate', ()=>{
                this.history.current = location.pathname;
            })
        }
    }
    go(){

    }
    back(){

    }
    push(){

    }
    createMap(routes){
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component;
            return memo;
        },{})
    }

}
//使用vue.use 就会调用install方法
VueRouter.install = function (Vue) {
    // 每个组件 都有this.$rout/this.route
    //在所有组件中获取同一个路由的实例
    Vue.mixin({
        //混合方法
        beforeCreate() {
            //获取组件属性名字
            if(this.$options && this.$options.router){
                this._root = this; //把当前实例挂载在_root上
                this._rooter = this.$options.router; //把router实例挂载在_router上
                //observer方法
                //如果history中的current属性变化 也会刷新试图
                //this.history = this.$options.router.history
                Vue.util.defineReactive(this, 'history', this.$options.router.history);
            }else {
                //vue组件渲染顺序 父->子
                this._root = this.$parent._root; //获取唯一的路由实例this._root._router
            }
            Object.defineProperty(this, '$router', {//Router实例
                get() {
                    return this._root._router;
                }
            });
            Object.defineProperty(this, '$route', {
                get() {//current属性
                    return{
                        //当前路由所在状态
                        current:this._root.history.current
                    };
                }
            });
        }
    })
    Vue.component('router-link', {
        props:{
            to:String,
            tag:String
        },
        methods:{
            handleClick(){
                //自定义跳转方式
            }
        },
        render(h) {
            let mode = this._self._root._rooter.mode;
            let tag = this.tag;
            return h(tag, {
                "on-click": this.handleClick,
                href: mode === 'hash' ? "#".concat(this.to) : this.to
            }, this.$slots.default);
        }
    });
    Vue.component('router-view', {//根据当前的状态 current 路由表{'/about':About}
        render(h) {
            //如何将current 表成动态的 current变化应该影响试图刷新
            //vue实现双向绑定 Object.defineProperty set get
            //console.log(this)
            let current = this._self._root._rooter.history.current;
            let routeMap = this._self._root._rooter.routesMape;
            return h(routeMap[current]);
        }
    })
}
export default VueRouter;
