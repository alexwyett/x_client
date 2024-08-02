const Twitter = require('./client');
const clientConfig = require('./clientConfig');

module.exports = function getV1Client(config) {
  const cfg = clientConfig(config);

  return new Twitter({
    subdomain: cfg.subdomain,
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