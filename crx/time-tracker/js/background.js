//create a browse session in local storage if it doesn't exist
//query active tab at set interval. if user is active, log the url and time increment
//--pass url through domain extractor
//--check to see if there is an entry for the domain in browse session
//--if not, create entry and log time
//--if yes, increment current time with new interval

var userActive;
var currentUser;
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


var intervalID = setInterval(findUser, 5000);


function findUser(){
  chrome.storage.local.get("currentUser", function(user){
    if (user){
      console.log("set current user:", user.currentUser.first_name);
      currentUser = user.currentUser;
      startSession();
      clearInterval(intervalID);
    }
  });
}

function startSession(){
  console.log("starting to log session for", currentUser.first_name);
  logBrowsing();
  sendSession();
}

function logBrowsing(){
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
}

function sendSession(){
  setInterval(function(){
    var report = JSON.stringify(timeReport);
    $.ajax({
      url: 'http://localhost:8000/users/' + currentUser.id + '/time/log',
      type: 'post',
      data: {user: currentUser.id, log: report}
    })
    .done(function(res) {
      console.log(res);
      timeReport = [];
    })
    .fail(function(err) {
      console.log(err);
    });

  }, 10000);
}
