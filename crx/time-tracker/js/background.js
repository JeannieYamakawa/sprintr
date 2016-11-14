// alert("this is the background.js speaking");
// setInterval(function(){
//   chrome.tabs.query(
//     {currentWindow: true, active : true},
//     function(tabArray){
//       console.log(tabArray);
//     }
//   )
// }, 5000)
// setInterval(function(){
//   $.ajax({
//     url: 'http://localhost:8000/login',
//     type: 'get',
//   })
//   .done(function(res) {
//     console.log("success");
//     console.log(res);
//   })
//   .fail(function() {
//     console.log("error");
//   });
// }, 5000)

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (sender.tab) {
//         console.log('userActive\'s value is ' + message.userActive);
//         userActive = message.userActive;
//         console.log("this message originated from", sender.tab);
//     } else {
//         if (message.settingsChanged) {
//             console.log('Settings changed!');
//             getSettings();
//         }
//     }
// });

// setTimeout(function(){
//   chrome.storage.local.get("test", function(item){
//     console.log("here is the storage item", item);
//   });
// }, 5000)
