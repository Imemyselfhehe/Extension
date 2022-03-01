function setDom() {
  let dom = document.body.innerHTML;
  chrome.storage.local.set({ dom });
}

chrome.runtime.onMessage.addListener(setDom);
document.body.onload = setDom;
