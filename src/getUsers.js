module.exports = async function getUsers(client, ids = []) {
  if (ids.find(id => typeof id === 'number')) {
    throw new Error('Each id must be a string')
  }

  return (await client.get(
    `users`,
    {
      ids: ids.map(u => u.trim()).join(','),
      'user.fields': 'profile_image_url'
    }
  )).data;
}