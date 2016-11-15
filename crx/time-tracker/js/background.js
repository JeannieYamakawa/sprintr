//create a browse session in local storage if it doesn't exist
//query active tab at set interval. if user is active, log the url and time increment
//--pass url through domain extractor
//--check to see if there is an entry for the domain in browse session
//--if not, create entry and log time
//--if yes, increment current time with new interval

var userActive;
var timeReport = [];

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
    userActive = message.userActive;
  }
});

setInterval(function(){
  if (userActive){
    chrome.tabs.query(
      {currentWindow: true, active : true},
      function(tabArray){

        var domain = extractDomain(tabArray[0].url);
        newEntry = true;
        timeReport.forEach(function(entry){
          if (entry.url === domain){
            newEntry = false;
            entry.time += 5;
          }
        });
        if (newEntry){
          timeReport.push({url: domain, time: 5});
        }
      }
    );
  }
}, 5000);


// setInterval(function(){
//     $.ajax({
//       url: 'http://localhost:8000/users/' + ,
//       type: 'default GET (Other values: POST)',
//       dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
//       data: {param1: 'value1'}
//     })
//     .done(function() {
//       console.log("success");
//     })
//     .fail(function() {
//       console.log("error");
//     })
//     .always(function() {
//       console.log("complete");
//     });
//
// }, 5000);
