const getTweetsById = require("./getTweetsById");
const uploadMedia = require("./uploadMedia");

module.exports = async function createTweet(v2Client, v1Client, text = '', media = '') {
  if (!v1Client.token || !v2Client.token) {
    throw new Error('Oauth token missing');
  }

  if (!text && !media) {
    throw new Error('Post body missing')
  }

  const expansionParams = {};
  if (media) {
    v1Client.setSubdomain('upload');
    const uploadRes = await uploadMedia(v1Client, media);

    if (uploadRes.media_id_string) {
      expansionParams.media = {
        media_ids: [uploadRes.media_id_string]
      }
    }
  }

  const response = await v2Client.post(
    'tweets',
    { 
      text: text || '',
      ...expansionParams
    }
  ).catch((err) => {
    throw err;
  });

  if (!response?.data?.id) {
    throw new Error(response?.detail || 'An error occurred creating your post');
  }

  return await getTweetsById(v2Client, [response?.data?.id])
}