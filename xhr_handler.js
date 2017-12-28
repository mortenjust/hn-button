var hnLinks = []

function xhrCall(url, port, id) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      port.postMessage({id: id, text: xhr.responseText});
    }
  };
  xhr.send();
}

chrome.browserAction.onClicked.addListener(function(tabId){
  console.log("It was clicked on "+tabId.id + ", so that's url: "+hnLinks[tabId.id])
  window.open(hnLinks[tabId.id])
})

// listen for "it's on HN / it's not on HN", then set the respective icon
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("received message")
  if (msg.action === "updateIcon") {
    console.log("message is updateicon")
      if (msg.value) {
        console.log("the value is true for tab " + sender.tab.id + ", paint that icon")
        console.log("the HN URL is "+msg.url)
          chrome.browserAction.setIcon({
              path: "img/hn_on48.png", 
              tabId: sender.tab.id
            });    
            hnLinks[sender.tab.id] = msg.url;             
            // chrome.browserAction.setPopup({
            //   tabId: sender.tab.id, 
            //   popup: "popup.html?url=" + encodeURI(msg.url)
            // })    
          // chrome.browserAction.enable(sender.tab.id)
      } else {
          chrome.browserAction.setIcon({
            path: "img/hn_off48.png", 
            tabId: sender.tab.id
          });          
          // chrome.browserAction.disable(sender.tab.id)
      }
  }
});

chrome.extension.onConnect.addListener(function(port){
  console.log("onConnect")
  port.onMessage.addListener(function(request) {
    xhrCall(request.url, port, request.id);
  });
});