import Vue from 'vue'
import store from "./libs/store";
//Main pages
import App from './views/app.vue'

window.axios = require('axios');
Vue.prototype.$axios = window.axios;



const app = new Vue({
    el: '#app',
    components: { App },
    store: store
});
