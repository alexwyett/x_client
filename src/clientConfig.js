module.exports = function clientConfig(config) {
  if (!config) {
    throw new Error('Client config Missing!')
  }

  if (!config.key) {
    throw new Error('Client Key Missing!')
  }

  if (!config.secret) {
    throw new Error('Client Key Missing!')
  }

  return {
    key: config.key,
    secret: config.secret,
    subdomain: config.subdomain || 'api',
    bearer: config.bearer || '',
    token: config.token || '',
    refresh_token: config.refresh_token || ''
  }
}