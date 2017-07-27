# lastfm-api

A simple NodeJS library that handles the authentication of Last.fm api requests and uses Promises.

## Installation
not available via npm yet.  Still in development.

## Examples

First, you'll need to get an API key from last.fm: http://www.last.fm/api/account.

Once you have your API key and API secret, you'll need to generate a session key, after which you can then start to scrobble.

## Documentation

First create a new instance of the LastfmApi class.

```js
var Lastfm = require('lastfm-api');

var lastfm = new LastfmApi({
	api_key: 'xxx',
	api_secret: 'xxx',
	username: 'xxx',
	password: 'xxx', // Can be substituted with authToken
	authToken: 'xxx', // Optional
	sessionKey: 'xxx' // Optional
});
```
**authToken** - you can use this instead of password, where authToken = md5(username + md5(password))

**sessionKey** - if you've already stored a session key for the user then you can re-use it since they have an unlimited lifetime (they can be revoked though)


There are only 3 methods available

### getSessionKey

```js
// lastfm is an instance of LastfmApi, see example above
lastfm.getSessionKey()
  .then(function(sessionKey){
    // sessionKey is automatically stored in this.sessionKey of the lastfm instance
    // but I would also suggest storing it somewhere for future use.
  })
  .catch(function(err){
    // handle error
  })
```

:warning:    
For the following get & post actions, if the [api documentaton](https://www.last.fm/api) lists any of these parameters you can ignore them, this library will handle that for you:    
* `api_key`
* `api_sig`
* `sk`


### get(string: method, Object: options)

Handles creating and sending a GET request to the API.  Read the [api documentaton](https://www.last.fm/api) to know which options are needed for your specific request.  

**method** - the api method name, example:`track.getTags`

**opts** - the parameters required for your specific lastFM request.  for example, [track.getTags](https://www.last.fm/api/show/track.getTags) only requires artist and track name.

**returns** a promise

```js
var trackInfo = {
  track : 'Roygbiv',
  artist : 'Boards of Canada',
	autocorrect: 1  // optional
};

// lastfm is an instance of LastfmApi, see example above
lastfm.get('track.getTags', trackInfo)
  .then(function(response){
    // do something with the API response
  })
  .catch(function(err){
    // handle error
  })
```

### post(string: method, Object: options)

Handles creating and sending a POST request to the API.  Read the [api documentaton](https://www.last.fm/api) to know which options are needed for your specific request.  

**method** - the api method name, example:`track.love`

**opts** - the non-Auth related parameters required for your specific lastFM post request method.  for example, [track.love](https://www.last.fm/api/show/track.love) only requires artist and track name.


returns a promise

```js
var trackInfo = {
  track : 'Roygbiv',
  artist : 'Boards of Canada'
};

// lastfm is an instance of LastfmApi, see example above
lastfm.post('track.love', trackInfo)
  .then(function(response){
    // do something with the API response
  })
  .catch(function(err){
    // handle error
  })
```