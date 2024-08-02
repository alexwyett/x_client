const getTweetRequestFields = require("./getTweetRequestFields");

module.exports = async function searchTweets(v2client, query, additionalExpansions = [], existing = [], next_token = '', numTimes = 0) {
  const searchData = await v2client.get(
    `tweets/search/recent`,
    {
      query,
      ...getTweetRequestFields(additionalExpansions),
      max_results: 100,
      ...(next_token ? { pagination_token: next_token } : {})
    }
  );

  if (searchData?.meta?.result_count === 0) {
    return [];
  }

  if (searchData.next_token && numTimes < 10) {
    return await searchTweets(v2client, query, additionalExpansions, existing.concat(searchData.data), searchData.next_token, numTimes + 1);
  }

  return existing.concat(searchData.data);
}