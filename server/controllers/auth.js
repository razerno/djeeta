const bot = require('../discord/bot');
const auth = require('../utils/auth');

exports.authorize = (req, res) => {
  res.redirect(auth.authorizationUri);
}

exports.token = (req, res) => {
  const code = req.query.code;
  const options = {
    code: req.query.code,
    redirect_uri: bot.config.redirect_uri,
  }

  auth.oauth2.authorizationCode.getToken(options)
  .then(result => {
    const token = result;
    req.session.token = token;
    res.redirect(req.baseUrl);
  })
  .catch(error => {
    console.log('Access Token Error: ', error.message);
    res.send("Authentication Failed");
  });
}

exports.revoke = (req, res) => {
  const token = auth.oauth2.accessToken.create(req.session.token);

  token.revoke('access_token')
  .then(() => {
    console.log('Access token revoked.')
    req.session = null;
    res.send("Successfully revoked token.");
    return token.revoke('refresh_token');
  })
  .then(() => {
    console.log('Refresh token revoked');
  })
  .catch((error) => {
    console.log('Error revoking token.', error.message);
    res.send("Failed to revoke token.")
  });
}