module.exports = {
  development: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      molatv: 'http://mola.lukitomo.com/v2',
      auth: 'http://jaenal.mola.tv/accounts/_',
      domain: 'http://jaenal.mola.tv'
    },
    auth: {
      app_key: '9KSkjpIb3I',
      response_type: 'code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      scope:
        'https://api.supersoccer.tv/users/users.profile.read https://api.supersoccer.tv/users/users.subscription.read https://api.supersoccer.tv/offline_access',
      state: 'po8mN1ip7ab'
    },
    tokenAuth: {
      app_key: '9KSkjpIb3I',
      app_secret: 'VEwMSSob5hPhXveRgTGXpSYmoTjDFVFq4BT1FXx2aEBJbqNhu3NRyaF83GsqLz9l',
      grant_type: 'authorization_code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      code: 'overrideCodeIsGeneratedWhenVerified'
    }
  },
  staging: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      molatv: 'https://api.staging.mola.tv/v2',
      auth: 'http://staging.mola.tv/accounts/_',
      domain: 'https://staging.mola.tv'
    },
    auth: {
      app_key: '9KSkjpIb3I',
      response_type: 'code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      scope:
        'https://api.supersoccer.tv/users/users.profile.read https://api.supersoccer.tv/users/users.subscription.read https://api.supersoccer.tv/offline_access',
      state: 'po8mN1ip7ab'
    },
    tokenAuth: {
      app_key: '9KSkjpIb3I',
      app_secret: 'VEwMSSob5hPhXveRgTGXpSYmoTjDFVFq4BT1FXx2aEBJbqNhu3NRyaF83GsqLz9l',
      grant_type: 'authorization_code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      code: 'overrideCodeIsGeneratedWhenVerified'
    }
  },
  production: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      molatv: 'https://api.supersoccer.tv/v2',
      auth: 'https://www.mola.tv/accounts/_',
      domain: 'http://www.mola.tv'
    },
    auth: {
      app_key: '9KSkjpIb3I',
      response_type: 'code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      scope:
        'https://api.supersoccer.tv/users/users.profile.read https://api.supersoccer.tv/users/users.subscription.read https://api.supersoccer.tv/offline_access',
      state: 'po8mN1ip7ab'
    },
    tokenAuth: {
      app_key: '9KSkjpIb3I',
      app_secret: 'VEwMSSob5hPhXveRgTGXpSYmoTjDFVFq4BT1FXx2aEBJbqNhu3NRyaF83GsqLz9l',
      grant_type: 'authorization_code',
      redirect_uri: 'https://example.com/callback' /** redirect uri must change to current page */,
      code: 'overrideCodeIsGeneratedWhenVerified'
    }
  }
};
