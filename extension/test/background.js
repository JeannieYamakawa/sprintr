// alert("this is the background.js speaking");
setInterval(function(){
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){
      console.log(tabArray);
    }
  )
}, 5000)
