var setCurrentSong = function(response){
  $('.main').html(response);
};
tabDo(function(tab){
    chrome.tabs.sendMessage(tab, 'getCurrentSong', setCurrentSong);

    $('.btns a').click(function(event){
      var action = '.' + $(this).data('action');
      chrome.tabs.sendMessage(tab, action, setCurrentSong);
    });
});
