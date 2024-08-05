import Vuex from 'vuex'
import Vue from "vue";
import { getComments} from "./queries";
Vue.use(Vuex)


const store = new Vuex.Store({
    state () {
        return {
            comments: [],
            isLoading: true,
            paginationParams: {
                currentPage: 1,
                perPage: 3,
                lastPage: 0,
            }
        }
    },
    mutations: {
        setLoading (state, val) {
            state.isLoading = val
        },
        setComemnts (state, val) {
            state.comments = val
        },
        setLastPage (state, val) {
            state.paginationParams.lastPage = val
        },
        setCurrentPage (state, val) {
            state.paginationParams.currentPage = val
        }
    },
    actions: {
        fetchComments({commit, state}) {
            getComments().then((comments) => {
                commit('setLastPage', Math.ceil(comments.data.length / state.paginationParams.perPage))
                commit('setComemnts', comments.data)
                commit('setCurrentPage', state.paginationParams.currentPage > state.paginationParams.lastPage ? state.paginationParams.lastPage : state.paginationParams.currentPage)
            }).finally(() => commit('setLoading', false))
        }
    },
    getters: {
        comments: (state) => state.comments,
        isLoading: (state) => state.isLoading,
        paginationParams: (state) => state.paginationParams
    }
})

export default store
