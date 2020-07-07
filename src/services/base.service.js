import axios from 'axios';
import appConfig from '@/app.config';
import StorageService from '@/services/storage.service';

// This will be the base service which is responsible to make all the outgoing calls
// This can be used to set the default headers/params to all the API request
// This can be used to intercept requests or responses before they are handled by then or catch.
const { ajaxTimeout, healthCookieExpire, baseApiPath } = appConfig,
    http = axios.create({
        timeout: ajaxTimeout
    });

function handleRequest(type = 'get') {
    return async function(...args) {
        await doHealthCheck().catch((error) => {
            return Promise.reject(error || { message: 'Service Unavailable' });
        });
        return http[type].apply(this, [...args]);
    };
  }

/**
 * doHealthCheck method check if "health" cookie available, if available & true then resolve the Promise else reject
 * if "health" cookie unavailable, then it will invoke helath service API to determine if the Gateway is operational
 * if success then set the "health" cookie to true and then resolve the Promise else reject
 *
 * @returns Void
 */
async function doHealthCheck() {
    const healthCookie = StorageService.getCookie('health');

    if (healthCookie !== null) {
        return healthCookie === 'true' ? Promise.resolve() : Promise.reject();
    }

    const { data: { status } = { status: '' } } = await http
        .get(`${baseApiPath}/healthcheck`)
        .catch((error) => {
            setHealthCookie(false);
            healthCheckErrorHandler(error);
            return Promise.reject(error);
        });

    setHealthCookie(status === 'OK');

    return status === 'OK' ? Promise.resolve() : Promise.reject();
}


/**
 * setHealthCookie method set the health cookie with expiration time set to the healthCookieExpire
 *
 * @param {Boolean} status, default value is false
 * @returns Void
 */
function setHealthCookie(status = false) {
    StorageService.setCookie({
      key: 'health',
      value: status,
      expireTimes: new Date(Date.now() + healthCookieExpire)
    });
}

export default {
    get: handleRequest('get'),

    post: handleRequest('post'),

    put: handleRequest('put'),

    delete: handleRequest('delete'),

    $http: http
};
