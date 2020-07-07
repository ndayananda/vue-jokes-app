const defaultConfig = {
    expires: "",
    path: "; path=/",
    domain: "",
    secure: "",
};

function getCookieExpiry(expireTimes = defaultConfig.expires) {
    let _expires = "";
    switch (expireTimes && expireTimes.constructor) {
        case Number:
            _expires = `; max-age=${expireTimes}`;
            break;
        case String:
            _expires = `; expires=${expireTimes}`;
            if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
                // get capture number group
                const _expireTime = expireTimes.replace(
                        /^(\d{1,})(?:y|m|d|h|min|s)$/i,
                        "$1"
                    ),
                    // get capture type group , to lower case
                    typeGroup = {
                        m: 2592000,
                        d: 86400,
                        h: 3600,
                        min: 60,
                        s: 1,
                        y: 31104000,
                    },
                    type = expireTimes
                        .replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1")
                        .toLowerCase();
                _expires = type
                    ? `; max-age=${Number(_expireTime) * typeGroup[type]}`
                    : _expires;
            }
            break;
        case Date:
            _expires = `; expires=${expireTimes.toUTCString()}`;
            break;
        default:
            break;
    }
    return _expires;
}

export default {
    /**
     * This method will return the cookie value based on the key passed. The regex splits  the key
     * and takes the string cookie name and gets the cookie value
     *
     * @param {string} key
     * @returns string
     * @public
     */
    getCookie(key) {
        let value =
            decodeURIComponent(
                document.cookie.replace(
                    new RegExp(
                        `(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(
                            /[-.+*]/g,
                            "\\$&"
                        )}\\s*\\=\\s*([^;]*).*$)|^.*$`
                    ),
                    "$1"
                )
            ) || null;

        if (
            value &&
            value.substring(0, 1) === "{" &&
            value.substring(value.length - 1, value.length) === "}"
        ) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
        return value;
    },

    /**
     * This method sets the cookie
     *
     * @param {Object} { key, value, expireTimes, path, domain, secure }
     * @returns this
     */
    setCookie({ key, value, expireTimes, path = defaultConfig.path, domain = defaultConfig.domain, secure = defaultConfig.secure }) {
        if (!key) {
            throw new Error("cookie name is not find in first argument");
        } else if (/^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
            throw new Error("cookie key name illegality");
        }
        // support json object
        if (value && value.constructor === Object) {
            value = JSON.stringify(value);
        }
        const _expires = getCookieExpiry(expireTimes);
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${_expires}; domain=${domain}; path=${path}${secure ? "; secure" : ""}`;
        return this;
    },

    /**
     * This method removes the cookie by setting it value to empty and expires to -1
     * cookie path should be passed to ensure that you delete the right cookie.
     *
     * @param {*} {key, path, domain}
     */
    removeCookie({ key, path = defaultConfig.path, domain = defaultConfig.domain }) {
        this.setCookie({ key, value: "", expireTimes: -1, path, domain });
    },
};
