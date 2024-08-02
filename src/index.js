module.exports = {
  Client: require('./client'),
  Helpers: {
    GetPostsById: require('./getTweetsById'),
    GetUsers: require('./getUsers'),
    GetPostInteractions: require('./getUserTweetInteractions'),
    GetProfile: require('./getProfileData')
  },
  Utils: {
    Client: {
      V1: require('./getV1Client'),
      V2: require('./getV2Client'),
    },
    Express: {
      GetTokensFromRequest: require('./getTokensFromReq')
    },
    GetTweetRequestFields: require('./getTweetRequestFields')
  }
}