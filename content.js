
function setDom() {
  /* Style elements for modal body, header, footer, the input field and submit button */
  var styles = `
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10000; /* Sit on top */
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
    z-index: 10000;
    position: relative;
  }

  .modal-body {padding: 2px 16px;}

  .modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }
  #element {
    color: black;
  }
  #button {
    border: 1px solid black;
    background-color: gray;
  }
  ` 
  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  /* Adding close element at the top of the modal*/
  var close_content = document.createElement('div');
  close_content.id = "chromeClose";
  var span = document.createElement('span');
  span.className = "close";
  var text = document.createTextNode("X");
  span.appendChild(text);
  close_content.appendChild(span);

  /* Adding modal content element where the filtered content will be added */
  var modal_content = document.createElement('div');
  modal_content.className = "modal-content";

  /* Adding modal header element where the input field will be added */
  var modal_header = document.createElement('div');
  modal_header.className = "modal-header";
  modal_header.appendChild(close_content);

    /* Adding modal body element where the filtered content will be added */
  var modal_body = document.createElement('div');
  modal_body.className = "modal-body";
  modal_body.id = "modalBody";
  var text = document.createTextNode("HTML Tag   ");
  
  /* Adding an input field where the tag of the elements to be filtered is input'ed */
  var input = document.createElement('input');
  input.type = "text";
  input.name = "fname";
  input.id = "element";
  modal_header.appendChild(text);
  modal_header.appendChild(input);
  var br = document.createElement('br');
  modal_header.appendChild(br);
  modal_header.appendChild(br);
   
  var br = document.createElement('br');
  modal_header.appendChild(br);
  modal_header.appendChild(br);
  var button = document.createElement('button');
  button.id = "button";
  var text = document.createTextNode("Submit");
  button.appendChild(text);
  modal_header.appendChild(button);

  /* Adding a footer to the modal */  
  var modal_footer = document.createElement('div');
  modal_footer.className = "modal-footer";
  var modal = document.createElement('div');
  modal.className = "modal";
  modal.id = "chromeModal";
  modal.backdrop = "false";

  /* Appending all the elements to the modal */
  modal_content.appendChild(modal_header);
  modal_content.appendChild(modal_body);
  modal_content.appendChild(modal_footer);
  modal.appendChild(modal_content);
  document.body.appendChild(modal);

  /* Adding functionality of the close button */
  document.getElementById('chromeClose').addEventListener('click', (e) => {
    modal = document.getElementById("chromeModal");
    modal.style.display = "none";
    e.stopPropagation();
  })

  /* Adding functionality of the submit button */
  document.getElementById("button").addEventListener("click", (e) => {
    let input = document.getElementById('element').value;
    modal_body = document.getElementById("modalBody");
    modal_body.innerHTML = "";
    var el;
    
    if(input == "div") {
      el = document.querySelectorAll("body > div");
    } else {
      el = document.getElementsByTagName(input);
    }

    for (const value of Array.from(el)) {
      if (value.className.indexOf("modal") == -1) {
        const clone = value.cloneNode(true);
        modal_body.appendChild(clone);
      }
    }
    e.stopPropagation();
  })

  /* Adding speech recognition element to the extention */
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.onresult = event => {
    let last = event.results.length - 1;
    let lastTranscript = event.results[last][0].transcript;
    let interim_transcript = '';
    let final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }else {
      interim_transcript += event.results[i][0].transcript;
      console.log(interim_transcript);
      } 
    }
    
    if (final_transcript == "open model" || final_transcript == "open modal") {
    modal = document.getElementById("chromeModal");
    modal.style.display = "block";
    modal_body = document.getElementById("modalBody");
    modal_body.innerHTML = "";
    input = document.getElementById('element');
    input.value = "";
    }
    if (final_transcript == "close") {
      modal = document.getElementById("chromeModal");
      modal.style.display = "none";
    }
  }

  recognition.addEventListener('end', () => {
    console.log('end')
    recognition.start();
  })

  recognition.start();

  let dom = document.body.innerHTML;
  chrome.storage.local.set({ dom });
}

function gotMessage(message) {
 setDom();
}

chrome.runtime.onMessage.addListener(gotMessage);
document.body.onload = setDom;

/* Defining functionality depending on the mouse-click on the webpage */
document.onclick = function(e)
{
  modal = document.getElementById("chromeModal");
  var span = document.getElementById("chromeClose");
  if(e.target.attributes.href == null && modal.style.display != "block"){    
        modal.style.display = "block";
        modal_body = document.getElementById("modalBody");
        modal_body.innerHTML = "";
        input = document.getElementById('element');
        input.value = "";
        console.log(modal);
  } else {
        if(e.target == modal || e.target == span) {
      modal.style.display = "none";
        }
  }
};

document.onkeydown = keydown;

/* Defining functionality depending on the key-press */
function keydown(evt){
  if (!evt) evt = event;
  modal = document.getElementById("chromeModal");
  if (evt.shiftKey && evt.keyCode == 9){ //Shif+TAB
      modal.style.display = "block";
      modal_body = document.getElementById("modalBody");
      modal_body.innerHTML = "";
      input = document.getElementById('element');
      input.value = "";
    }
  if (evt.shiftKey && evt.ctrlKey){ //Shif+ CTRL
      modal.style.display = "none";
    }
}
