function Calcular() {
    var rst = document.getElementById("rst")
    var data = document.getElementById("nasc").value.split("-");
    var nasc = new Date(data[0], data[1]-1, data[2])
    var milis = Math.abs(new Date() - nasc)
    var dias = milis/1000/60/60/24
    
    rst.innerText = "Você nasceu há " + dias.toString().split(".")[0] + " dias"
}