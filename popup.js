let printDOM = document.getElementById("printDOM");

chrome.storage.local.get("dom", ({ dom }) => {
  printDOM.innerHTML = dom;
});
