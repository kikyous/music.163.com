chrome.commands.onCommand.addListener(function(command) {
  tabDo(function(tab){
    var action = '.' + command;
    chrome.tabs.sendMessage(tab, action);
  });
});
