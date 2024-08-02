const dotenv = require('dotenv');
dotenv.config();

const assert = require('node:assert');
const { test } = require('node:test');

const { Utils, Helpers } = require('../src/index');

test('GetUsers', async () => {
  const client = Utils.Client.V2({
    key: process.env.TWITTER_CLIENT_ID,
    secret: process.env.TWITTER_CLIENT_SECRET,
    bearer: process.env.TWITTER_BEARER_TOKEN
  })

  const data = await Helpers.GetUsers(client, ['12']);
  
  assert.equal(Array.isArray(data), true);
  assert.strictEqual(data[0].id, '12');
  assert.strictEqual(data[0].username, 'jack');
  assert.strictEqual(data[0].name, 'jack');
})