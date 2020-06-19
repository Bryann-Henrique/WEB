
//Coloca números no campo de cálculo
function GetValue(click_id) {
    var valor = document.getElementById(click_id).innerText;
    
    var resultado = document.getElementById("rst");
    
    if (resultado.innerText.length < 12) {
        if (resultado.innerText == 0) resultado.innerText = valor;
        else resultado.innerText += valor;
    }
}


//Coloca operadores no campo de cálculo
function GetOperator(click_id) {
    var valor = document.getElementById(click_id).innerText;
    
    var resultado = document.getElementById("rst");
    
    if (resultado.innerText.length < 12) resultado.innerText += valor;
}


//Limpa o campo de cálculo
function Clear() {
    document.getElementById("rst").innerText = 0;
}


//Remove último caractere do campo de cálculo
function RemoveLastChar() {
    var resultado = document.getElementById("rst");
    
    if (resultado.innerText.length > 1) resultado.innerText = resultado.innerText.slice(0, resultado.innerText.length - 1);
    
}


//Calcula expressão
function Calc() {
    var resultado = document.getElementById("rst");
    
    resultado.innerText = eval(resultado.innerText);
}