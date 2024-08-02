const dotenv = require('dotenv');
dotenv.config();

const assert = require('node:assert');
const { test } = require('node:test');

const { Utils, Helpers } = require('../src/index');

test('GetPostsById', async () => {
  const client = Utils.Client.V2({
    key: process.env.TWITTER_CLIENT_ID,
    secret: process.env.TWITTER_CLIENT_SECRET,
    bearer: process.env.TWITTER_BEARER_TOKEN
  })

  const data = await Helpers.GetPostsById(client, ['20']);  
  assert.equal(Array.isArray(data), true);
  assert.strictEqual(data[0].id, '20');
  assert.strictEqual(data[0].text, 'just setting up my twttr');
  assert.strictEqual(data[0].author.username, 'jack');
})