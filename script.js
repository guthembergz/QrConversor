const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

const dbtn = document.querySelector('.dbtn');
const backH = document.querySelector('.backH');
backH.style.visibility = "hidden";

const fullPage = document.querySelector('.fullscreen');
fullPage.style.visibility = "hidden";


//Exibe IDs de mensagens
let demo = document.getElementById("demo");
demo.style.visibility = "hidden";
let demo2 = document.getElementById("demo2");
demo2.style.visibility = "hidden";


// Quando pressiono Enter no Form Input, ele acionará (clique) o botão "Gerar código QR"
var input = document.getElementById("text1");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});


// Propriedades do botão de geração de código QR
generateBtn.addEventListener("click", () =>{

    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Gerando QR Code⌛.....";
    generateBtn.style.cursor="no-drop";
    generateBtn.style.opacity= "0.7";

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;//.src

    qrImg.addEventListener("load", () =>{
        wrapper.classList.add("active");
        generateBtn.innerText = "QR Code Gerado";
        generateBtn.style.cursor="no-drop ";
        generateBtn.style.opacity= "0.7";

        document.querySelector("#text1").addEventListener("input", test);

        document.getElementById("theImage").style.visibility = "hidden";
        document.getElementById("btn").style.visibility = "hidden";
        document.getElementById("btn1").style.visibility = "hidden";
        document.getElementById("demo").style.visibility = "hidden";
        backH.style.visibility = "visible";
        
//Passando o mouse sobre o elemento
        generateBtn.onmouseover = function() {
          setTimeout(() => {
            demo1.style.visibility = 'visible';
          }, 150);
        }

//No mouse fora do elemento
        generateBtn.onmouseout = function() {
          setTimeout(() => {
            demo1.style.visibility = 'hidden';
          }, 150);
        }
    });
});


// Quando o Form Input não contém nenhum valor, ele é mostrado como está antes do QR Code gerado
qrInput.addEventListener("keyup", () =>{
    if(!qrInput.value.trim()) {

      sameprop();

    }
});


// Verifica se a entrada do formulário tem valor ou não e exibe a mensagem
function inputtext(){
    var value1 = document.getElementById('text1').value;
    if (value1.length == 0)
    {        
      demo.style.visibility = "visible";      
      setTimeout(() => {
        demo.style.visibility = 'hidden';
      }, 1300); 
    }
}




// Desativa o modo de desenvolvedor (desativa o botão direito, código de tecla 123, ctrl+shift+i, ctrl+shift+c, ctrl+shift+j, ctrl+u)
// document.onkeydown = function(e) {
//   if(event.keyCode == 123) {       
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {       
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {       
//     return false;
//   }
//   if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {       
//     return false;
//   }
//   if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {      
//     return false;
//   }
// }


// //disable right click
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
});


// Download generated QR Code Image on click "DOWNLOAD" button
function downloadIg(elmnt) {
  demo2.style.visibility = "visible";
  dbtn.style.cursor="no-drop";
  dbtn.style.opacity= "0.7";

  const link = elmnt
  const url = qrImg.src
  const options = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
 fetch(url, options)
  .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "QR_Code.jpg";
        a.click();
        dbtn.style.cursor="pointer";
        dbtn.style.opacity= "1";
        demo2.style.visibility = "hidden";
      });
    }); 
}


// Back to Home Button Properties
function backHome(){
  sameprop();
}


// Same Properties for two functions
function sameprop(){
  document.getElementById("text1").value = "";
  wrapper.classList.remove("active");
  preValue = "";
  generateBtn.innerText = "Generate QR Code";

  generateBtn.onmouseover = function() {
    setTimeout(() => {
      demo1.style.visibility = 'hidden';
    }, 150);
  }

  document.getElementById("theImage").style.visibility = "visible";
  document.getElementById("btn").style.visibility = "visible";
  document.getElementById("btn1").style.visibility = "visible";
  backH.style.visibility = "hidden";
  generateBtn.style.opacity= "1";
}


function test(e) {
  generateBtn.style.opacity= "1";
  generateBtn.style.cursor="pointer";
}