function setDom() {
  let dom = document.body.innerHTML;
  chrome.storage.local.set({ dom });
}
function gotMessage(message) {
  if (message.txt == "hello") {
   var modal = document.createElement('div');
modal.className = "modal";
 var el = document.getElementsByTagName(message.value);
 var tag = document.createElement(message.value);
 tag.appendChild(el[0]);
 for (const value of el) {
  tag.appendChild(value)
  }

 modal.appendChild(tag);
  console.log(modal);
document.body.appendChild(modal);
var styles = `
 .modal {
    position: fixed;
    top: 25%;
    left: 10%;
    width: 1000px;
    line-height: 200px;
    height: 600px;
    margin-left: -10px;
    margin-top: -10px;
    background-color: #C0C0C0;
    text-align: center;
    z-index: 10;
    outline: 9999px solid rgba(0,0,0,0.5);
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
 
  } else {
    setDom();
  }
}
chrome.runtime.onMessage.addListener(gotMessage);
document.body.onload = setDom;


