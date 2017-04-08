// Search for a specified string.

function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.captions.list({
    part: 'id,snippet',
    videoId: q
  });

  var title = ''
  gapi.client.youtube.videos.list({
    part: 'snippet',
    id: q
  }).then(function (jsonResp, rawresp) {
      var obj = JSON.parse(jsonResp.body);
      title = obj.items[0].snippet.title;
  })

  request.execute(function(response) {
    var str = JSON.stringify(response.result, null, ' ');
    $('#search-button')[0].className = 'button is-info is-loading'

    var captionId = response.result.items[0].id;
    var captionReq = gapi.client.youtube.captions.download({
      id: captionId,
      tfmt: 'srt',
      tlang: 'en'
    }).then(function (jsonResp, rawResp) {
        console.log(jsonResp);
        var data = jsonResp.body
        data = encodeURIComponent(data);
        $('#container').html(`<a href="data:application/octet-stream,${data}" download="${title}.srt">${title}</a>`);
        $('#search-button')[0].className = 'button is-info'

    })



  });
}
