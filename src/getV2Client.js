const Twitter = require('./client');
const clientConfig = require('./clientConfig');

module.exports = function getV2Client(config) {
  const cfg = clientConfig(config);

  return new Twitter({
    subdomain: cfg.subdomain,
    version: "2", // version "1.1" is the default (change for v2)
    extension: false, // true is the default (this must be set to false for v2 endpoints)
    consumer_key: cfg.key,
    consumer_secret: cfg.secret,
    bearer_token: cfg.token ? null : cfg.bearer,
    ...(
      cfg.token ? {
        access_token_key: cfg.token,
        access_token_secret: cfg.refresh_token
      } : {}
    )
  });
}