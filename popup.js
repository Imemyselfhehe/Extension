let printDOM = document.getElementById("printDOM");
chrome.storage.local.get("dom", ({ dom }) => {
  printDOM.innerHTML = dom;
});
document.getElementById("button").addEventListener("click", saveDynamicDataToFile);
		function saveDynamicDataToFile() {
		        var content =printDOM.innerHTML 
            var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
  url: url
});
      console.log("worked");
        }