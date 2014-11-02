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
$(function(){
  var player = $('#g_player'),
      element = player.find('.head img')[0];

  var observer = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(attrModified);
  });
  observer.observe(element, { attributes: true });

  function attrModified(event, title) {
    var img = element.src.split('?')[0] + '?param=150x150',
        song = player.find('a.fc1.f-fl').text(),
        artisit = player.find('span.by span').attr('title');
    notifyMe(img, song + ' - ' + artisit, title || '');
  };

  player.find('a.ply').click(function(){
    var title = $(this).hasClass('pas') ? '(已暂停)' : '' ;
    attrModified(null, title);
  });
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message instanceof Array){
    message[0](message(1), message(2));
  } else if( /^\./.test(message) ){
    $(message)[0].click();
    sendResponse($('.fc1.f-fl').text());
  } else {
    sendResponse($('.fc1.f-fl').text());
  };
});
