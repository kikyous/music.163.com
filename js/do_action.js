chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if( /^\./.test(message) ){
    $(message)[0].click();
    sendResponse($('.fc1.f-fl').text());
  } else {
    sendResponse($('.fc1.f-fl').text());
  };
});
