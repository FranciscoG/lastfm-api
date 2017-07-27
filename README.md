# lastfm-api

A simple nodejs library to interface with the last.fm API

## Installation
not available via npm yet.  Still in development.

## Examples

First, you'll need to get an API key from last.fm: http://www.last.fm/api/account.

Once you have your API key and API secret, you'll need to generate a session key, after which you can then start to scrobble:

```js
var Lastfm = require('lastfm-api');

var lastfm = new LastfmApi({
	api_key: 'xxx',
	api_secret: 'xxx',
	username: 'xxx',
	password: 'xxx',
	authToken: 'xxx' // Optional, you can use this instead of password, where authToken = md5(username + md5(password))
});

