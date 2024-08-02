module.exports = async function getProfileData(v1Client) {
  const profile = await v1Client.get("account/verify_credentials");
  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
}