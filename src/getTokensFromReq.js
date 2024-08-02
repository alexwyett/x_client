module.exports = function getTokensFromReq(req) {
  const { oauth_refresh_token, oauth_token } = req.query || {};
  const { oauth_refresh_token: body_refresh_token, oauth_token: body_token } = req.body || {};
  const { oauth_refresh_token: headers_refresh_token, oauth_token: headers_token } = req.headers || {};

  const refresh_token = oauth_refresh_token || body_refresh_token || headers_refresh_token;
  const token = oauth_token || body_token || headers_token;

  if (token && !refresh_token) {
    throw new Error('Refresh token not found');
  }

  return {
    token,
    refresh_token
  }
}