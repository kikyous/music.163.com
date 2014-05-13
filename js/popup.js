var setCurrentSong = function(response){
  $('.main').html(response);
};
chrome.tabs.query({currentWindow: true, url: '*://music.163.com/*'}, function(tabs) {
    if(tabs.length === 0){
      chrome.tabs.create({'url': "http://music.163.com/", 'pinned': true});
      return true;
    }
    var tabId = tabs[0].id;

    chrome.tabs.sendMessage(tabId, 'getCurrentSong', setCurrentSong);

    $('.btns a').click(function(event){
      var action = '.' + $(this).data('action');
      chrome.tabs.sendMessage(tabId, action, setCurrentSong);
    });
});
