import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from '@/js/router'

const auth = {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        },
        isAdmin(state) {
            return state.user.admin >= 1
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        }
    },
    actions:{
        async login({commit}){
            try {
                const {data} = await axios.get('/api/user')
                commit('SET_USER',data)
                commit('SET_AUTHENTICATED',true)
                router.push({name:'home'})

            } catch (e) {
                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
            }
        },
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        }
    }
}

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth
    }
})

export default store