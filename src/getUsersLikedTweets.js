module.exports = async function getUsersLikedTweets(v2client, user_id, existing = [], next_token = '', numTimes = 0) {
  if (!v2client.token) {
    return [];
  }

  const tweetData = await v2client.get(
    `users/${user_id}/liked_tweets`,
    {
      max_results: 100,
      ...(next_token ? { pagination_token: next_token } : {})
    }
  );

  if (tweetData.next_token && numTimes < 10) {
    return await getUsersLikedTweets(v2client, user_id, existing.concat(tweetData.data), tweetData.next_token, numTimes + 1);
  }

  return existing.concat(tweetData.data);
}