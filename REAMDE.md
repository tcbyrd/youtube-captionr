### YouTube Captionr

**NOTE**: This is in the very early stages of development and is not yet fully functional. I felt like the UI for editing captions in the YouTube dashboard was a bit over complicated for my needs, so while looking at the v3 API I realized I could do a couple of interesting things:

1. View a [list](https://developers.google.com/apis-explorer/#search/youtube.captions.list/) of the standard captions for any public video by it's ID
2. [Download](https://developers.google.com/apis-explorer/#search/youtube.captions.download/m/youtube/v3/youtube.captions.download) the captions in several formats for offline editing
3. Edit the machine translated captions in multiple languages

At first, I thought I'd just download the caption files, edit, and do a quick re-upload, but then I realized if I have edit access to the video, I could also [update](https://developers.google.com/apis-explorer/#search/youtube.captions.update/m/youtube/v3/youtube.captions.update) the caption through the same API. So I started to see how easy it would be to just throw the captions in a couple of text fields and update it right in a web browser.

This is my initial spike at that concept. Right now you just select a language and search for a specific video, but it successfully pulls in the `SRT` formatted text into two text fields, decoded with [UTF-8](https://www.npmjs.com/package/utf8) for multiple language support. I even added some quick jquery to sync the scroll areas.

I'm open to suggestions if this is useful to anyone. Here are the features I'm planning to implement:
- Upload the edited caption back to YouTube
- Allow the "Original" and "Edit" containers to be their own independent languages to aid with translation workflows
- Let users save their editing session in Local Storage (a good excuse to play around with service workers, maybe?)
- Embed the video on the page so you can watch it while you edit
  - Eventually, it would be nice to be able to keep the text area in sync with the video.

#### Getting Started
The main thing you'll need is an OAuth Client token from Google. First, create a project on Google Cloud, enabled the YouTube v3 API and use this link to generate your credentials:
https://console.cloud.google.com/apis/credentials/oauthclient/ (choose the "Web Application" option)

Next, add your `OAUTH2_CLIENT_ID` to `auth.js`. It should be formatted something like this:
`<organizationId>-<random-string-of-characters>.apps.googleusercontent.com`

Then you just need to startup a simple web server. I included a [Caddyfile](https://github.com/mholt/caddy) that will start this up on http://locahost:8000/search.html, but it should work just fine with SimpleHTTPServer and products of that ilk.

That's all for now. Just find an ID of a YouTube video and click search to see the raw captions in multiple languages!
