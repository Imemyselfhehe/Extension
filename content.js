function setDom() {
var styles = `
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

` 

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

          var close_content = document.createElement('div');
         close_content.id = "chromeClose";
          var span = document.createElement('span');
         span.className = "close";

         var text = document.createTextNode("X");
         span.appendChild(text);
         close_content.appendChild(span);
        var modal_content = document.createElement('div');
          modal_content.className = "modal-content";
         var modal_header = document.createElement('div');
          modal_header.className = "modal-header";
                   modal_header.appendChild(close_content);
          var modal_body = document.createElement('div');
          modal_body.className = "modal-body";
          modal_body.id = "modalBody";
          /*var form = document.createElement('form');
          form.id = "element";
          form.action = "/action_page.php";
          form.method = "GET";*/
         var text = document.createTextNode("HTML Tag   ");
         
         var input = document.createElement('input');
         input.type = "text";
         input.name = "fname";
         input.value = "p";
         input.id = "element";
         modal_header.appendChild(text);
         modal_header.appendChild(input);

         var br = document.createElement('br');
         modal_header.appendChild(br);
         modal_header.appendChild(br);
         /*
         form.appendChild(input1);
         form.appendChild(br);*/
         var button = document.createElement('button');
         button.id = "button";
         var text = document.createTextNode("Submit");
         button.appendChild(text);
         modal_header.appendChild(button);       
//         form.appendChild(input2);

          var modal_footer = document.createElement('div');
          modal_footer.className = "modal-footer";
          var modal = document.createElement('div');
          modal.className = "modal";
          modal.id = "chromeModal"
          modal_content.appendChild(modal_header);
          modal_content.appendChild(modal_body);
          modal_content.appendChild(modal_footer);
          modal.appendChild(modal_content);

document.body.appendChild(modal);
document.getElementById('chromeClose').addEventListener('click', (e) => {
  modal = document.getElementById("chromeModal");
    modal.style.display = "none";
    e.stopPropagation();
})
document.getElementById("button").addEventListener("click", (e) => {
  let input = document.getElementById('element').value;
  modal_body = document.getElementById("modalBody");
  var el = document.getElementsByTagName(input);
 var tag = document.createElement(input);
 tag.appendChild(el[0]);
 for (const value of el) {
  tag.appendChild(value);
  }
modal_body.innerHTML = "";
 modal_body.appendChild(tag); 
 e.stopPropagation();
}) 
  let dom = document.body.innerHTML;
  chrome.storage.local.set({ dom });
}
function gotMessage(message) {

 setDom();
}
chrome.runtime.onMessage.addListener(gotMessage);
document.body.onload = setDom;

                   

function modalClose() {
modal = document.getElementById("chromeModal");
  modal.style.display = "none";
}

document.onclick = function(e)
{
    // e.target, e.srcElement and e.toElement contains the element clicked.
 modal = document.getElementById("chromeModal");
 var span = document.getElementById("chromeClose");
    if(e.target.attributes.href == null && modal.style.display != "block"){
     
      modal.style.display = "block";
      console.log(modal);

    } else {
      console.log("here");
 
      if(e.target == modal || e.target == span) {
    modal.style.display = "none";
      }
      
      
  }

};

