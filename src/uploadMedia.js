module.exports = async function uploadMedia(v1Client, media) {
  if (!v1Client.token) {
    throw new Error('Oauth token missing');
  }

  if (typeof media !== 'string') {
    throw new Error('Media upload is not a string');
  }

  v1Client.setSubdomain('upload');

  const uploadRes = await v1Client.postMedia(
    "media/upload",
    {
      media_data: media.replace('data:image/png;base64,', ''),
      media_category: 'tweet_image'
    }
  ).catch((err) => {
    throw err;
  });

  return uploadRes;
}