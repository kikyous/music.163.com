function tabDo(callback){
  chrome.tabs.query({url: '*://music.163.com/*'}, function(tabs) {
      if(tabs.length === 0){
        chrome.tabs.create({'url': "http://music.163.com/", 'pinned': true});
        return true;
      }
      var tab = tabs[0].id;
      callback(tab);
      });
};
