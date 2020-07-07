import Jokes from '@/views/Jokes.vue';
import Login from '@/views/Login.vue';

export default [{
    path: '/',
    name: 'home',
    redirect: 'jokes'
}, {
    path: '/jokes',
    name: 'jokes',
    component: Jokes
}, {
    path: '/login',
    name: 'login',
    component: Login
}]