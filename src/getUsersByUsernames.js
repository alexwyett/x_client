module.exports = async function getUsersByUsernames(client, usernames = []) {
  return await client.get(
    `users/by`,
    {
      usernames: usernames.map(u => u.trim()).join(','),
      'user.fields': 'connection_status'
    }
  );
}