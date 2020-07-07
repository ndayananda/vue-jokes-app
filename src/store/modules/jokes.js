import appConfig from '@/app.config';
import JokesService from '@/services/jokes.service';

const { jokesCount, maxFavoriteJokes } = appConfig;

export default {
    namespaced: true,
    state: {
        jokes: [],
        favorites: []
    },
    mutations: {
        updateFavorites(state, favorites) {
            state.favorites = favorites;
        },
        updateJokes(state, jokes) {
            state.jokes = jokes;
        }
    },
    actions: {
        async getJokes({ commit, rootGetters }) {
            const { data: { value: jokeList } = { value: []} } = await JokesService.getJokes(jokesCount, {headers: getAuthHeader(rootGetters)});
            commit('updateJokes', jokeList);
        },
        async addToFavorite({ dispatch, state, rootGetters }, { id }) {
            if(state.favorites.length === maxFavoriteJokes) return Promise.resolve();

            let favorite = {};
            if(id) {
                favorite = state.jokes.find(joke => joke.id === id);
            } else {
                const { data: { value: randomjokes } = { randomjokes: []} } = await JokesService.getJokes(1, {headers: getAuthHeader(rootGetters)});
                favorite = randomjokes[0] || {};
            }
            if(favorite) {
                const updatedFavorites = uniqBy([ ...state.favorites, {...favorite}], 'id');
                await dispatch('setFavoriteJokes', updatedFavorites);
            }
            return Promise.resolve();
        },
        removeFavorite({ dispatch, state }, { id }) {
            const updatedFavorites = state.favorites.filter(joke => joke.id !== id);
            dispatch('setFavoriteJokes', updatedFavorites);
        },
        async getFavoriteJokes({commit, rootGetters}) {
            const {data: { favoriteJokes = [] }} = await JokesService.getFavoriteJokes({headers: getAuthHeader(rootGetters)}).catch(err => console.log(err));
            commit("updateFavorites", favoriteJokes);
        },
        async setFavoriteJokes({commit, rootGetters}, updatedFavorites) {
            await JokesService.setFavoriteJokes(updatedFavorites, {headers: getAuthHeader(rootGetters)}).catch(err => console.log(err));
            commit("updateFavorites", updatedFavorites);
        }
    }
};

function getAuthHeader(rootGetters) {
    return {
        Authorization: `Bearer ${rootGetters['auth/getAuthToken']}`
    }
}

function uniqBy(arr, predicate) {
    const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

    return [...arr.reduce((map, item) => {
        const key = (item === null || item === undefined) ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
    }, new Map()).values()];
}