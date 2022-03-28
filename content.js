function setDom() {
  let dom = document.body.innerHTML;
  chrome.storage.local.set({ dom });
}
function gotMessage(message) {
  if (message.txt == "hello") {
   var modal = document.createElement('div');
modal.className = "modal";

var close = document.createElement('button');
close.className = "button-close-modal";
var text = document.createTextNode("X");
 close.appendChild(text);
 modal.appendChild(close);

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
.button-close-modal {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-left: auto;
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
document.body.addEventListener(
  "click",
  function(event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
      event.target.matches(".button-close-modal") ||
      !event.target.closest(".modal")
    ) {
      closeModal()
    }
  }, {once: false}
);

function closeModal() {
  document.querySelector(".modal").style.display = "none"
}

