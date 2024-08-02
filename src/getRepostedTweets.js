module.exports = async function getRepostedTweets(v2Client, user_id, existing = [], next_token = '', numTimes = 1) {
  const tweetData = await v2Client.get(
    `users/${user_id}/tweets`,
    {
      expansions: 'referenced_tweets.id',
      max_results: 100,
      ...(next_token ? { pagination_token: next_token } : {})
    }
  );

  const retweets = tweetData.data.filter(
    t => Array.isArray(t.referenced_tweets) && t.referenced_tweets.length > 0
  );

  if (tweetData.next_token && numTimes < 10) {
    return await getRepostedTweets(v2Client, user_id, existing.concat(retweets), tweetData.next_token, numTimes + 1);
  }

  return existing.concat(retweets);
}