

window.onload = function() {

    //Carrega a lista de raças a partir da API
    LoadBreeds();


    //Carrega os campos armazenados localmente
    LoadFields();


    //Pega as configuações selecionadas e personaliza o nome
    UpdateDogTitle();

}




//Carrega os campos armazenados localmente
function LoadFields() {
    document.querySelector('#dog-name').value = localStorage.getItem("dogName");
    //Raça é selecionada ao fim fa requsição Ajax
    document.querySelector('#sel-font-type').selectedIndex = localStorage.getItem("fontType");
    document.querySelector('#sel-font-color').selectedIndex = localStorage.getItem("fontColor");
}




//Salva os campos selecionados no armazenamento local
function SaveFields() {
    localStorage.setItem("dogName", document.querySelector('#dog-name').value);
    localStorage.setItem("dogBreed", document.querySelector('#sel-breed').selectedIndex);
    localStorage.setItem("fontType", document.querySelector('#sel-font-type').selectedIndex);
    localStorage.setItem("fontColor", document.querySelector('#sel-font-color').selectedIndex);
    localStorage.setItem("dogSaveDate", CurrentDateTime());


    // Mensagem campos salvos
    document.getElementById('msg-output').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Os campos foram salvos!
    </div>`
}




//Limpa localStorage e os campos
function ClearFields() {
    //Limpa localStorage
    localStorage.removeItem("dogName");
    localStorage.removeItem("dogBreed");
    localStorage.removeItem("fontType");
    localStorage.removeItem("fontColor");
    localStorage.removeItem("dogSaveDate");

    //Limpa campos
    document.querySelector('#dog-name').value = "";
    document.querySelector('#sel-breed').selectedIndex = 0;
    document.querySelector('#sel-font-type').selectedIndex = 0;
    document.querySelector('#sel-font-color').selectedIndex = 0;

    //Limpa área do cachorro
    document.querySelector("#dog-title").innerText = "";
    document.querySelector("#dog-img").setAttribute("src", "img/dog-standard.png");


    // Mensagem limpeza concluida
    document.getElementById('msg-output').innerHTML = `
    <div class="alert alert-primary alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Os campos foram limpos!
    </div>`
}




function CurrentDateTime() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}




//Carrega a lista de raças a partir da API
function LoadBreeds() {
    var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "https://dog.ceo/api/breeds/list/all", true);


    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var racas = JSON.parse(this.responseText);


            //A opção padrão será a "Selecione..."
            var options = "<option value='' selected disabled>Selecione...</option>";


            //Cria uma string com todas as opções em HTML
            for (let [raca, subraca] of Object.entries(racas.message)) {
                options += "<option value=\"" + raca + "\">" + raca + "</option>";
            }


            //Insere as opções na listagem
            document.querySelector("#sel-breed").innerHTML = options;
            document.querySelector("#sel-breed").selectedIndex = document.querySelector("#sel-breed").options[1].value;


            //Seleciona a raça salva ao carregar a lista de raças
            if (localStorage.getItem("dogBreed") != null) {
                document.querySelector('#sel-breed').selectedIndex = localStorage.getItem("dogBreed");
                UpdateDogImage();
            }

        }
    }
    xmlhttp.send();
}




//Atualiza a imagem do cão de acordo com a raça selecionada
function UpdateDogImage() {
    var xmlhttp = new XMLHttpRequest();

    var dogBreed = document.querySelector("#sel-breed");
    var imgLink = "https://dog.ceo/api/breed/" + dogBreed.value + "/images/random"


    xmlhttp.open("GET", imgLink, true);

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var dogImg = document.querySelector("#dog-img");

            if (response.status == "success") {
                dogImg.setAttribute("src", response.message);
                //dogImg.style.backgroundImage = response.message;
            }
            else {
                dogImg.setAttribute("src", "");
            }    

        }
    }
    xmlhttp.send();

}




//Pega as configuações selecionadas e personaliza o nome
function UpdateDogTitle() {
    var elemDogName = document.querySelector("#dog-name");
    var elemFontType = document.querySelector("#sel-font-type");
    var elemFontColor = document.querySelector("#sel-font-color");
    var dogTitle = document.querySelector("#dog-title");
    var fontType = 0;
    var fontColor = 0;

    
    //Seleciona o tipo de fonte 
    switch(elemFontType.selectedIndex) {
        case 0: fontType = "'Cinzel', serif"; break;
        case 1: fontType = "'Sacramento', cursive"; break;
        case 2: fontType = "'Chelsea Market', cursive"; break;
        case 3: fontType = "'Pacifico', cursive"; break;
        case 4: fontType = "'Bangers', cursive"; break;
        default: fontType = "'Cinzel', serif";
    }

    //Selecione a cor da fonte
    switch(elemFontColor.selectedIndex) {
        case 0: fontColor = "#000000"; break;
        case 1: fontColor = "#1e90ff"; break;
        case 2: fontColor = "#ff6348"; break;
        case 3: fontColor = "#2ed573"; break;
        case 4: fontColor = "#e056fd"; break;
        default: fontColor = "#ecf0f1";
    }


    //Define os atributos
    dogTitle.innerText = elemDogName.value;
    dogTitle.style.fontFamily = fontType;
    dogTitle.style.color = fontColor;

}




//EVENTOS


//Muda imagem quando seleionado nova raça
document.querySelector("#dog-name").addEventListener("input", function() {
    UpdateDogTitle();
});

document.querySelector("#sel-font-type").addEventListener("change", function() {
    UpdateDogTitle();
});

document.querySelector("#sel-font-color").addEventListener("change", function() {
    UpdateDogTitle();
});



//Muda imagem quando seleionado nova raça
document.querySelector("#sel-breed").addEventListener("change", function() {
    UpdateDogImage();
});



//Salva os valores dos campos no local storage
document.querySelector("#btn-salvar").addEventListener("click", function() {
    SaveFields();
});

//Limpa os campos e o localStorage
document.querySelector("#btn-limpar").addEventListener("click", function() {
    ClearFields();
});