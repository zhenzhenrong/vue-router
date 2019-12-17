import Home from "../views/Home.vue";
import About from "../views/About.vue";
// const Home = (resolve) => {
//     import('@/views/Home').then((module) => {
//         resolve(module)
//     })
// };
export default [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/about',
        component:About
    }
]
