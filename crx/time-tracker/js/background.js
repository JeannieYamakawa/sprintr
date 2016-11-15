//create a browse session in local storage if it doesn't exist
//query active tab at set interval. if user is active, log the url and time increment
//--pass url through domain extractor
//--check to see if there is an entry for the domain in browse session
//--if not, create entry and log time
//--if yes, increment current time with new interval


var extractDomain = function(url) {
    var domain;
    //find & remove protocol and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (sender.tab) {
    console.log('userActive\'s value is ' + message.userActive);
    userActive = message.userActive;
    console.log("this message originated from", sender.tab);
  }
});

setInterval(function(){
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){
      console.log(tabArray);
    }
  )
}, 5000);
