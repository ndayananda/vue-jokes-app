import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import store, { Actions } from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

const isAuthenticated = async () => {
    await store.dispatch(Actions.IS_AUTHENTICATED).catch(err => Promise.reject());
    return Promise.resolve();
}

router.beforeEach((to, from, next) => {
    isAuthenticated().then(() => {
        next();
    })
    .catch(() => {
        if(to.name === 'login') {
            next();
        } else {
            next('/login');
        }
    });
})

export default router;
