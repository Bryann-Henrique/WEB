//Carrego o JSON embutido no código para alimentar meu sistema.
//OBS: No mundo real seria um API, mas para testes vai servir.
var DATABASE = JSON.parse(document.querySelector('#data-attendant').innerText);



//Carrega na 
window.onload = function () {

    //Carrega lista de atendentes
    LoadAttendant();

    //Inicia o sistema informando que o atendente é -1, ou seja, não foi selecionado
    localStorage.setItem("ID_Attendant", -1);

    //Atualiza indicadores
    UpdateDashboard();
}




//Altera a cor de uma linha indicando que ela está selecionada
function SelectLine(elem) {
    var table = elem.parentElement.children;
    var tableID = elem.parentElement.id;
    var rowID = elem.cells[0].innerText;


    //Se a linha atual já estiver selecionada então não faz nada
    if (SelectedLineID(elem) == rowID) return;


    //Remove o estilo de todos os items
    for (let i = 0; i < table.length; i++) {
        table[i].classList.remove('select-list-item');
    }


    //Coloca o estilo apenas no item clicado
    elem.classList.add('select-list-item');


    if (tableID == "attendant-table-body") {
        //Armazena o id do atendente em no localStorage para caso seja necessário acessar seus dados
        localStorage.setItem("ID_Attendant", elem.cells[0].innerText);


        //Carrega lista de clientes vinculados a um atendente
        LoadClient(elem.cells[0].innerText-1);
    }


}  //Seleciona uma linha




//Retorna o ID da linha selecionada
function SelectedLineID(elem) {
    var table = elem.parentElement.children;


    //A linha que tiver a classe de selelção é a linha que esta selecionada
    for (let i = 0; i < table.length; i++) {

        if (table[i].classList.contains('select-list-item')) {
            return table[i].cells[0].innerText;
        }

    }


    //Indica que nenhum item foi selecionado
    return -1;
}




//Carrega lista de atendentes
function LoadAttendant() {
    var tableAttendant = document.querySelector('#attendant-table-body');
    var strTableList = "";


    //Itera a DATABASE e prepara uma string com os dados dos atendentes
    for (let i in DATABASE) {
        
        strTableList +=  `
            <tr onclick="SelectLine(this)">
                <td class="hide-column">` + DATABASE[i].matricula + `</td>
                <td>
                    <div  style="vertical-align: middle" class="task-contain">
                        <h6 class="d-inline-block text-center">
                            <img class="table-img-person" src="` + DATABASE[i].foto + `" alt="Foto do atendente">
                        </h6>
                        <p class="d-inline-block m-l-20">` + DATABASE[i].atendente + `</p>
                    </div>
                </td>
                <td>` + DATABASE[i].qtd_atendimentos + `</td>
                <td>` + DATABASE[i].montante_vendas + `</td>
                <td class="hide-column">` + DATABASE[i].qtd_reclamacoes + `</td>
            </tr>
        `            
        
    } //for


    //Insere a lista de atendentes na tabela
    tableAttendant.innerHTML = strTableList;


} //Carrega atendentes




//Carrega lista de clientes vinculados a um atendente
function LoadClient(ID_ATTENDANT) {
    var tableClient = document.querySelector('#client-table-body');
    var strTableList = "";
    var clientes = DATABASE[ID_ATTENDANT].clientes;


    //Itera a DATABASE e prepara uma string com os dados dos atendentes
    for (let i in clientes) {
        
        strTableList +=  `
            <tr onclick="SelectLine(this)">
                <td>` + clientes[i].codigo + `</td>
                <td>` + clientes[i].nome + `</td>
                <td>` + clientes[i].telefone + `</td>
                <td><select class="form-control form-control-sm" onchange="UpdateStatus(this)">
                    <option ` + (clientes[i].status == 1 ? "selected" : "") + ` value="1">Concluído</option>
                    <option ` + (clientes[i].status == 2 ? "selected" : "") + ` value="2">Pendente</option>
                    <option ` + (clientes[i].status == 3 ? "selected" : "") + ` value="3">Em espera</option>
                </select></td>
            </tr>
        `            

    } //for


    //Insere a lista de atendentes na tabela
    tableClient.innerHTML = strTableList;


} //Carrega atendentes




//Atualiza o valor do select na DATABASE
function UpdateStatus(elem) {
    var clientID = Number(elem.parentElement.parentElement.cells[0].innerText);
    var newStatus = Number(elem.selectedIndex);
    var attendantID = Number(localStorage.getItem("ID_Attendant")-1);
    var clientList = DATABASE[attendantID].clientes;

    for (let i in clientList) {
        if (clientList[i].codigo == clientID) {
            clientList[i].status = newStatus;
        }
    }
    
}




//Atualiza os indicadores
function UpdateDashboard() {
    var vendas = 0;
    var atendimentos = 0;
    var reclamacoes = 0;

    for (let i in DATABASE) {
        vendas += DATABASE[i].montante_vendas;
        atendimentos += DATABASE[i].qtd_atendimentos;
        reclamacoes += DATABASE[i].qtd_reclamacoes;
    }

    document.querySelector('#header-qtd-atendimentos').innerText = atendimentos;
    document.querySelector('#header-montante-vendas').innerText = vendas;
    document.querySelector('#header-qtd-reclamacoes').innerText = reclamacoes;
}




//CADASTRO DE CLIENTE

    //Cadastra o cliente
    function RegisterClient() {
        var code = document.querySelector('#form-client-codigo');
        var name = document.querySelector('#form-client-name');
        var phone = document.querySelector('#form-client-phone');
        var born = document.querySelector('#form-client-born');
        var gender = document.querySelector('#form-client-gender');
        var address = document.querySelector('#form-client-address');
        var ID_Attendant = localStorage.getItem("ID_Attendant");
        var client = new Object();
        var field = "";


        //Valida os campos
        if (name.value == "" || !name.checkValidity()) field = "NOME";
        else if (phone.value == "" || !phone.checkValidity()) field = "TELEFONE";
        else if (born.value == "" || !born.checkValidity()) field = "NASCIMENTO";
        else if (gender.value == "" || !gender.checkValidity()) field = "SEXO";
        else if (address.value == "" || !address.checkValidity()) field = "ENDEREÇO";

        if (field != "") {
            document.querySelector('#form-output-msg').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center justify-content-between" role="alert" style="height: 4em">
                Campo ` + field + ` preenchido incorretamente!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`            
        }


        //Montando o objeto do novo cliente
        client.codigo = GenerateCode();
        client.nome = name.value;
        client.nascimento = born.value;
        client.sexo = gender.value;
        client.telefone = phone.value;
        client.endereco = address.value;
        client.status = 3;

        console.log(client);


        //Adiciona o novo cliente
        AddClient(client)


        //Limpa todos os campos
        ClearFields();


        //Carrega lista de clientes vinculados a um atendente
        LoadClient(localStorage.getItem("ID_Attendant")-1);


        //Fecha a tela de cadastro
        OpenCloseRegisterCliente()


        //Informa que o cliente foi cadastrado
        document.querySelector('#btn-notify').click();

    } //Cadastra o cliente



    //Adidiona um objeto de cliente a DATABASE
    function AddClient(client) {
        var idAttendant = localStorage.getItem("ID_Attendant")-1;
        var clientList = DATABASE[idAttendant].clientes;

        clientList[clientList.length] = client;
    }



    //Gera um código crescente a partir do código do último cliente da DATABASE
    function GenerateCode() {
        return DATABASE[DATABASE.length-1].clientes[DATABASE[DATABASE.length-1].clientes.length-1].codigo + 1;
    }



    //Limpa todos os campos
    function ClearFields(){
        document.querySelector('#form-client-name').value = "";
        document.querySelector('#form-client-phone').value = "";
        document.querySelector('#form-client-born').value = "";
        document.querySelector('#form-client-gender').value = "m";
        document.querySelector('#form-client-address').value = "";
    }



    //Abre/fecha tela de cadastro de cliente
    function OpenCloseRegisterCliente() {
        var registerClient = document.querySelector('#client-card');

        
        //Verifica se um atendente foi selecionado
        if (localStorage.getItem("ID_Attendant") == -1) {
            alert('Selecione um atendete!');
            return;
        }


        if (registerClient.classList.contains('full-card')) {
            registerClient.classList.remove('full-card');
            registerClient.style.display = "none";
            ClearFields();
        } else {
            registerClient.classList.add('full-card');
            registerClient.style.display = "block";
        }

    }


//LISTENERS
    
    //Botão de limpar os campos
    document.querySelector('#bt-register-button').addEventListener('click', RegisterClient);

    //Botão de limpar os campos
    document.querySelector('#bt-clear-button').addEventListener('click', ClearFields);

    //Botão abrir tela de cadastro de cliente
    document.querySelector('#bt-new-client').addEventListener('click', OpenCloseRegisterCliente);

    //Botão de fechar tela de cadastro e botão de cancelar o cadastro
    document.querySelector('#bt-cancel-button').addEventListener('click', OpenCloseRegisterCliente);



// Morris bar chart
Morris.Bar({
    element: 'morris-bar-chart',
    data: [{
        y: 'Março',
        a: 50,
        b: 40,
        c: 30
    }, {
        y: 'Abril',
        a: 75,
        b: 65,
        c: 40
    }, {
        y: 'Maio',
        a: 100,
        b: 90,
        c: 40
    }],
    xkey: 'y',
    ykeys: ['a', 'b', 'c'],
    labels: ['Vendas', 'Atendimentos', 'Reclamações'],
    barColors: ['#5FBEAA', '#5D9CEC', '#cCcCcC'],
    hideHover: 'auto',
    gridLineColor: '#eef0f2',
    resize: true
});