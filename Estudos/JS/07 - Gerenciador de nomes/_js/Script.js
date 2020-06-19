

//Eventos
document.getElementById("btn-add").addEventListener("click", AddTaskToList);

document.getElementById("txt-task").addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        AddTaskToList();
    }
});



//Funções
//Adiciona uma tarefa à lista
function AddTaskToList() {
    list = document.getElementById("task-list");
    txtTask = document.getElementById("txt-task");

    //Cria um elemento de lista
    elem = document.createElement("li");
    elem.setAttribute("class", "animate-li");
    elem.innerHTML = "<label><input type='checkbox' onclick='AddLineThrough(this)'>" + txtTask.value + "</label>";

    //Adiciona o elemento à lista
    list.append(elem);

    //Limpa o campo de texto
    txtTask.value = "";
}


//Risca a tarefa
function AddLineThrough(elem) {
    if (elem.checked) {
        elem.parentNode.style.textDecoration = "line-through";
    } else {
        elem.parentNode.style.textDecoration = "none";
    }

}