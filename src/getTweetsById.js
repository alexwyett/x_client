const getTweetRequestFields = require("./getTweetRequestFields");
const getUsers = require("./getUsers");

module.exports = async function getTweetsById(client, ids, additionalExpansions = []) {
  if (!Array.isArray(ids)) {
    throw new Error('Post ids bust be an array')
  }
  
  if (ids.find(id => typeof id === 'number')) {
    throw new Error('Each id must be a string')
  }

  const { data: newTweets, includes } = await client.get(
    `tweets`,
    {
      ids: `${ids.map(id => String(id).trim()).join(',')}`,
      ...getTweetRequestFields(additionalExpansions),
    }
  );

  const posts = newTweets || [];

  const { media } = includes || { media: [] };

  const authors = await getUsers(client, posts.map(nt => nt.author_id));

  return posts.map(nt => ({
    ...nt,
    media: (media || []).filter(m => (nt?.attachments?.media_keys || []).includes(m.media_key)),
    author: authors.find(auth => auth.id === nt.author_id)
  }));
}