const appConfig = {
    title: "Vue Jokes App",
    version: '1.0',
    jokesCount: 10, // Random jokes to be fetched from server
    maxFavoriteJokes: 10, // Maximum allowed favorite jokes
    randomFavoriteTimer: 5000, // in miliseconds
    ajaxTimeout: 30000,
    baseApiPath: '/api',
    healthCookieExpire: 5 * 60e3, // health cookie expire time in milliseconds
    token_expiration: 90, // in Minutes
};

export default appConfig;