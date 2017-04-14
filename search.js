// Search for a specified string.
function search() {
  var q = $('#query').val();
  $('#search-button')[0].className = 'button is-info is-loading'
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
    var lang = $('#lang').val();
    var captionId = response.result.items[0].id;
    var captionReq = gapi.client.youtube.captions.download({
      id: captionId,
      tfmt: 'srt',
      tlang: lang
    }).then(function (jsonResp, rawResp) {
        console.log(jsonResp);
        var data = jsonResp.body
        data = utf8.decode(data);
        console.log("Decoded", data);
        // data = data.replace(/\s\s/g, '<br />')
        // data = data.replace(/\d\s(?=.)/g, '<br />')
        // $('#container').html(`<a href="data:application/octet-stream;charset=UTF-8,${data}" download="${title}-${lang}.srt">${title}-${lang}</a>`);
        $('#original-container').text(data)
        $('#original-container').css('display', 'block')
        $('#original-container').scroll(function () {
          $('#edit-container').scrollTop($('#original-container').scrollTop())
        })
        $('#edit-container').text(data)
        $('#edit-container').css('display', 'block')
        $('#edit-container').scroll(function () {
          $('#original-container').scrollTop($('#edit-container').scrollTop())
        })
        $('#search-button')[0].className = 'button is-info'

    })

  });
}
