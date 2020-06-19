

function Calcula() {
    var altura = document.getElementById("altura").value;
    var peso = document.getElementById("peso").value;
    var imc = peso / (altura * altura);
    var texto = "";


    if (imc < 17) texto = "Muito abaixo do peso";
    else if (imc >= 17 && imc < 18.5) texto = "Abaixo do peso";
    else if (imc >= 18.5 && imc < 25) texto = "Peso normal";
    else if (imc >= 25 && imc < 30) texto = "Acima do peso";
    else if (imc >= 30 && imc < 35) texto = "Obesidade I";
    else if (imc >= 35 && imc < 40) texto = "Obesidade II (severa)";
    else if (imc >= 40) texto = "Obesidade III (mórbida)";


    document.getElementById("label-result").innerText = texto;
}