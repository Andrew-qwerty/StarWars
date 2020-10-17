/*<!-- Переделайте примерм 013 через работу атрибутов.
 Попробуйте варианты с рефакторингом -->*/
window.onload = function () {

    var form  = document.getElementsByTagName('form')[0];
    var userName = document.getElementById('userName');
    var email = document.getElementById('email');
    var zip = document.getElementById('zip');

    var namePattern = /\S/;
    var mailPattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    var zipPattern = /\d{5}/;
// регистрация обработчиков событий элементов формы.
    userName.addEventListener ("change", function(){validate(userName, namePattern)}, false);
    email.addEventListener ("change", function(){validate(email, mailPattern)}, false);
    zip.addEventListener ("change", function(){validate(zip, zipPattern)}, false);
    form1.onsubmit = onsubmitHandler;


// метод проверки значения в элементе по регулярному выражению.
function validate(elem, pattern) {
    var res = pattern.test(elem.value);
    if (res === false) {
        elem.className = "invalid";
    } 
    else {
        elem.className = "valid";
    }
}

function onsubmitHandler(event) {
    var invalid = false;
    for (var i = 0; i < form1.elements.length-1; ++i) {
        if (form1.elements[i].value.length === 0 || form1.elements[i].className === "invalid") {
            alert("Допущены ошибки при заполнении формы.");
            event.preventDefault();
            return false;
            break;
        }
    }
 }          
}