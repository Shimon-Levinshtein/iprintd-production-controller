const inputText = document.querySelector("#input_text");
const ulTestk = document.querySelector(".ulTeskList");

document.querySelector("#input_text").addEventListener("keyup", function () {
    if (document.querySelector(".checkBoxKlict").checked) {
        let len = ulTestk.children.length;
        for (let i = 0; i < len; i++) {
            if (ulTestk.children[i].children[2].textContent.indexOf(inputText.value) > -1) {
                ulTestk.children[i].style.display = "block";
            } else {
                ulTestk.children[i].style.display = "none";
            }
        }
    }
}, false);

document.querySelector(".checkBoxKlict").addEventListener("click", function (event) {
    console.log(document.querySelector('.button_enter_task'));
    
    document.querySelector('.button_enter_task').classList.toggle("display-none");
    if (document.querySelector(".checkBoxKlict").checked == false) {
        let len = ulTestk.children.length;
        for (let i = 0; i < len; i++) {
            ulTestk.children[i].style.display = "block";
        }
    }
},false);