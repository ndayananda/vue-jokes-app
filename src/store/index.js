import Vue from "vue";
import Vuex from "vuex";
import auth from '@/store/modules/auth';
import jokes from '@/store/modules/jokes';

Vue.use(Vuex);

export const Actions = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    IS_AUTHENTICATED: 'auth/isAuthenticated',
    //GET_PROFILE: 'auth/getProfile',
    ADD_TO_FAVORITE: "jokes/addToFavorite",
    REMOVE_FAVORITE: "jokes/removeFavorite",
    GET_FAVORITE_JOKES: "jokes/getFavoriteJokes",
    GET_JOKES: 'jokes/getJokes'
};

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    modules: {
        auth,
        jokes
    }
});

export default store;
