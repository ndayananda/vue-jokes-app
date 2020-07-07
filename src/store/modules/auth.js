import AuthService from '@/services/auth.service';
import StorageService from '@/services/storage.service';
import appConfig from '@/app.config';

export default {
    namespaced: true,
    state: {
        token: null,
        user: {}
    },
    getters: {
        getAuthToken: (state) => state.token
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
        },
        updateUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async login({ commit }, {username, password}) {
            if(!username || !password) return;
            const {data: {token = null, user = {}}} = await AuthService.login({username, password}).catch(err => {
                return Promise.reject(err);
            });
            loginSuccessHandler({commit, token, user});
            return Promise.resolve();
        },
        async isAuthenticated({ commit, state }) {
            if(state.token) {
                return Promise.resolve();
            }

            const accessToken = StorageService.getCookie('access_token');

            if(!accessToken) return Promise.reject();

            await AuthService.verifyLogin({headers: getAuthHeader(accessToken)}).catch(err => Promise.reject(err));

            const {data: {user = {}}} = await AuthService.getProfile({headers: getAuthHeader(accessToken)}).catch(err => Promise.reject(err));

            loginSuccessHandler({commit, token: accessToken, user});

            return Promise.resolve();
        },
        async logout({ commit, state }) {
            await AuthService.clearCache({headers: getAuthHeader(state.token)}).catch(err => Promise.reject(err));
            StorageService.removeCookie({key: 'access_token'});
            commit('updateToken', '');
            commit('updateUser', {});
            return Promise.resolve();
        },
    }
};

function loginSuccessHandler({commit, token, user}) {
    setTokenCookie(token);
    commit('updateToken', token);
    commit('updateUser', user);
}

function setTokenCookie(token) {
    StorageService.setCookie({ key: 'access_token', value: token, expireTimes: Math.floor(Date.now() / 1000) + (60 * appConfig.token_expiration) });
}

function getAuthHeader(token) {
    return {
        Authorization: `Bearer ${token}`
    }
}