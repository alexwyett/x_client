const getUsersLikedTweets = require("./getUsersLikedTweets");
const getRepostedTweets = require("./getRepostedTweets");
const getUsersByUsernames = require("./getUsersByUsernames");
const getTweetsById = require("./getTweetsById");

module.exports = async function getUserTweetInteractions(v2Client, user_id, ids = []) {
  if (!v2Client.token) {
    throw new Error('Oauth token missing');
  }

  const tweets = await getTweetsById(v2Client, ids);
  const likedTweetIds = (await getUsersLikedTweets(v2Client, user_id)).map(t => t.id);
  const reposted = (await getRepostedTweets(v2Client, user_id)).map(t => t.referenced_tweets).flat();
  const users = await getUsersByUsernames(v2Client, tweets.map(t => t.author.username));
  
  const interactions = tweets.map(
    t => ({
      ...t,
      liked: likedTweetIds.includes(t.id),
      retweeted: reposted.filter(r => r.type === 'retweeted').map(r => r.id).includes(t.id),
      following: (users?.data || []).find(u => u.username === t.author.username)?.connection_status?.includes('following') === true
    })
  )

  return interactions;
}