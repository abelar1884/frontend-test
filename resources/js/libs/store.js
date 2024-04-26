import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)


const store = new Vuex.Store({
    state () {
        return {
            isLoading: false
        }
    },
    mutations: {
        setLoading (state, val) {
            state.isLoading = val
        }
    },
    getters: {
        isLoading: (state) => state.isLoading
    }
})

export default store
