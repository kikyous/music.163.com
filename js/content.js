function notifyMe(icon, body, title) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();

  var notification = new Notification('网易云音乐'+title, {
    tag: 'music.163.com',
    icon: icon,
    body: body,
  });

  setTimeout(function(){notification.close()}, 5000);
  notification.onclick = function(x) { window.focus(); };
};

window.onbeforeunload = function(){
  chrome.storage.local.set({'playing': false});
};
$(function(){
  var player = $('#g_player'),
      element = player.find('.head img')[0],
      playing = player.find('a.ply')[0];

  var observer = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(attrModified);
  });
  observer.observe(element, { attributes: true });

  var observer1 = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(function(mutation){
      if (mutation.target.classList.length != mutation.oldValue.split(' ').length){
        result = mutation.target.classList.contains('pas');
        attrModified(null, result ? '' : '(已暂停)');
        chrome.storage.local.set({'playing': result});
      }
    });
  });
  observer1.observe(playing, { attributes: true, attributeOldValue: true });

  function getSong(){
    return player.find('a.fc1.f-fl').text();
  };

  function getArtist(){
    return player.find('span.by span').attr('title');
  };

  function getCover(){
    return player.find('.head img')[0].src.split('?')[0] + '?param=150x150';
  };

  function attrModified(event, title) {
    notifyMe(getCover(), getSong() + ' - ' + getArtist(), title || '');
  };

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if( /^\./.test(message) ){
      $(message)[0].click();
    }
    sendResponse({
      playing: player.find('a.ply').hasClass('pas'),
      song: getSong(),
      artist: getArtist(),
      cover: getCover()
      });
  });
});
