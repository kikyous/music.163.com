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
