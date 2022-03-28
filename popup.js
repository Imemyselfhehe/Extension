let printDOM = document.getElementById("printDOM");
var temp = document.createElement("body");
chrome.storage.local.get("dom", ({ dom }) => {
  temp.innerHTML = dom;
  //document.body.appendChild(temp.getElementsByTagName("p")[0]);
  //printDOM.innerHTML = dom;
});
document.getElementById("element").addEventListener("click", getOption);
function getOption() {
/*
    var w = 440;
    var h = 220;
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop

 var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}");
 if (window.focus) win.focus();
//win.document.body.innerHTML = "HTML";

  var el = temp.getElementsByTagName(document.getElementById('element').elements[0].value);

  console.log(el)
    var tag = win.document.createElement(document.getElementById('element').elements[0].value);
      tag.appendChild(el[0]);
    win.document.body.appendChild(tag);
for (const value of el) {
  tag.appendChild(value)
  }
*/

let params = {
  active: true,
  currentWindow: true
};
let input = document.getElementById('element').elements[0].value;

chrome.tabs.query(params, gotTabs);

function gotTabs(tabs) {
  let msg = {
    txt: "hello",
    value: input
  }
  chrome.tabs.sendMessage(tabs[0].id,msg);

}
window.close();
}

document.getElementById("button").addEventListener("click", saveDynamicDataToFile);
		function saveDynamicDataToFile() {
		        var content =temp.innerHTML 
            var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
  url: url
});
}