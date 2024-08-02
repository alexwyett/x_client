module.exports = function getTweetRequestFields(additionalExpansions = []) {
  return {
    expansions: additionalExpansions.concat(['referenced_tweets.id', 'attachments.media_keys']).join(','),
    'tweet.fields': 'public_metrics,referenced_tweets,conversation_id,author_id,created_at',
    'media.fields': 'preview_image_url,type,url,height,alt_text,width,variants'
  }
}