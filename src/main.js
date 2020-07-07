/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';
import store from '@/store';
import router from '@/router';

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import App from '@/App.vue';

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#jokes-app');