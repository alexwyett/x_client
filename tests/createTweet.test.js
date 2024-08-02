const dotenv = require('dotenv');
dotenv.config();

const assert = require('node:assert');
const { test } = require('node:test');

const { Utils, Helpers } = require('../src/index');

test('CreatePost', async () => {
  const clientv1 = Utils.Client.V1({
    key: process.env.TWITTER_CLIENT_ID,
    secret: process.env.TWITTER_CLIENT_SECRET,
    token: process.env.TWITTER_TOKEN,
    refresh_token: process.env.TWITTER_REFRESH_TOKEN
  })
  const clientv2 = Utils.Client.V2({
    key: process.env.TWITTER_CLIENT_ID,
    secret: process.env.TWITTER_CLIENT_SECRET,
    token: process.env.TWITTER_TOKEN,
    refresh_token: process.env.TWITTER_REFRESH_TOKEN
  })

  const [ post ] = await Helpers.CreatePost(clientv2, clientv1, 'testing');
  
  assert.strictEqual(post.text, 'testing');
})