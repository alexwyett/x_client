module.exports = async function getUsersFollowing(v2client, user_id, existing = [], next_token = '', numTimes = 1) {
  if (!v2client.token) {
    return [];
  }

  const tweetData = await client.get(
    `users/${user_id}/following`,
    {
      max_results: 100,
      ...(next_token ? { pagination_token: next_token } : {})
    }
  );

  if (tweetData.next_token && numTimes < 10) {
    return await getUsersFollowing(v2client, user_id, existing.concat(tweetData.data), tweetData.next_token, numTimes + 1);
  }

  return existing.concat(tweetData.data);
}