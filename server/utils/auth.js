const bot = require('../discord/bot');

export const oauth2 = require('simple-oauth2').create({
  client: {
    id: bot.config.client_id,
    secret: bot.config.client_secret,
  },
  auth: {
    tokenHost: 'https://discordapp.com',
    tokenPath: '/api/oauth2/token',
    revokePath: '/api/oauth2/token/revoke',
    authorizePath: '/api/oauth2/authorize',
  },
});

export const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: bot.config.redirect_uri,
  scope: 'identify',
  state: '3(#0/!~',
});

export const refreshToken = async session => {
  const token = oauth2.accessToken.create(session.token);
  if (token.expired()) {
    const newToken = await token.refresh();
    session.token = newToken.token;
  }
}


export const fetchUser = async session => {
  await refreshToken(session);
  const userObject = await fetch('https://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
      'Authorization': session.token.token_type + ' ' + session.token.access_token
    }
  })
  .then(res => res.json());

  return userObject;
}

export const isUserAuthorized = async (session, guildId) => {
  console.log(session);
  if (session.token == undefined) return false;
  const userObject = await fetchUser(session);
  const guild = bot.client.guilds.get(guildId);
  if (guild.members.get(userObject.id)) {
    return true;
  } else {
    return false;
  }
}