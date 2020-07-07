import BaseService from '@/services/base.service';
import appConfig from '@/app.config';

export default {
    getJokes(count, {params = {}, headers = {}}) {
        return BaseService.get(`/jokes/${count}`, {params, headers});
    },

    getFavoriteJokes({params = {}, headers = {}}) {
        return BaseService.get(`/jokes/favorite`, {params, headers});
    },

    setFavoriteJokes(payload, {params = {}, headers = {}}) {
        return BaseService.post(`/jokes/favorite`, payload, {params, headers});
    }
}