import BaseService from '@/services/base.service';
import apiConfig from '@/app.config';

export default {
    login({username, password}, params = {}, headers = {}) {
        return BaseService.post(`${apiConfig.baseApiPath}/login`, {username, password}, {params, headers});
    },
    verifyLogin({params = {}, headers = {}}) {
        return BaseService.get(`${apiConfig.baseApiPath}/login/verify`, {params, headers});
    },
    getProfile({params = {}, headers = {}}) {
        return BaseService.get(`${apiConfig.baseApiPath}/users/myprofile`, {params, headers});
    },
    clearCache({params = {}, headers = {}}) {
        return BaseService.get(`${apiConfig.baseApiPath}/cache/clear`, {params, headers});
    }
};