# X/Twitter Client

This is a basic X/Twitter client for node.js applications.

## Installation
Run `npm i @cagen/x_client` in your application.

## Usage
This package provides two clients, V1 and V2 which connect to the respective twitter apis.  To Initialise you can use the following. Note: I have used env variables to provide the client id, secret and bearer token that you must get from the X developers admin site.  The Token and Refresh Token must be obtained from a valid session.

```
import { Utils } from '@cagen/x_client';

const client = Utils.Client.V1({
  key: process.env.TWITTER_CLIENT_ID,
  secret: process.env.TWITTER_CLIENT_SECRET,
  bearer: process.env.TWITTER_BEARER_TOKEN
})
```
You have access to the clients rest methods which can be used to interact with the api.

```
  const profile = await client.get("account/verify_credentials")
```

I have provided some helper methods which do some of the repetive code when performing api actions such as:

### Getting a users profile
```
import { Helpers, Utils } from '@cagen/x_client';

const clientv1 = Utils.Client.V1({
  key: process.env.TWITTER_CLIENT_ID,
  secret: process.env.TWITTER_CLIENT_SECRET,
  token: process.env.TWITTER_TOKEN,
  refresh_token: process.env.TWITTER_REFRESH_TOKEN
})

const profile = await Helpers.GetProfile(clientv1);
```

### Retrieving posts
```
import { Helpers, Utils } from '@cagen/x_client';

const client = Utils.Client.V2({
  key: process.env.TWITTER_CLIENT_ID,
  secret: process.env.TWITTER_CLIENT_SECRET,
  bearer: process.env.TWITTER_BEARER_TOKEN
})

const data = await Helpers.GetPostsById(client, ['20']);  
```

### Creating a Post
```
import { Helpers, Utils } from '@cagen/x_client';

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
```