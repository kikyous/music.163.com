chrome.storage.local.get('playing', function(items) {
  var playing = items.playing;
  $('.jp-play').toggleClass('pause', playing).toggleClass('play', !playing);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    var playing = storageChange.newValue;

    $('.jp-play').toggleClass('pause', playing).toggleClass('play', !playing);
  }
});

var setCurrentSong = function(response){
  $('.title').text(response.song).parent().attr('href','http://www.baidu.com/s?wd='+response.song);
  $('.album-cover img').attr('src', response.cover);
  $('.artist').text(response.artist).attr('href','http://www.baidu.com/s?wd='+response.artist);
};
tabDo(function(tab){
    chrome.tabs.sendMessage(tab, 'getCurrentSong', setCurrentSong);

    $('div.player-controls > .main > div').click(function(event){
      var action = '.' + $(this).data('action');
      chrome.tabs.sendMessage(tab, action, setCurrentSong);
    });
});
