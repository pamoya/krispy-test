import DonutList from '@/pages/DonutList.vue'
import SalesList from '@/pages/SalesList.vue'
import UserAccess from '@/pages/UserAccess.vue';
import UserRegister from '@/pages/UserRegister.vue';
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/login', component: UserAccess, props: {Function}},
    { path: '/register', component: UserRegister},
    { path: '/donuts', component: DonutList, meta:{requiresAuth:true}},
    { path: '/sales', component: SalesList}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem('userAuth');
if(to.meta.requiresAuth){
    if(token){
        next()
    } else{
        next('login')
    }

} else{
    next();
}
})

export default router;