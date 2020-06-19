

function Slide() {    
    setInterval(function() {
        var div = document.getElementById("img");
        var estilo = window.getComputedStyle(div, false);
        var img = estilo.backgroundImage;
        var path = img.slice(0, img.length - 9);
        

        if (img.search("001.jpg") != -1) div.style.backgroundImage = path + "002.jpg\")";
        else if (img.search("002.jpg") != -1) div.style.backgroundImage = path + "003.jpg\")";
        else if (img.search("003.jpg") != -1) div.style.backgroundImage = path + "004.jpg\")";
        else if (img.search("004.jpg") != -1) div.style.backgroundImage = path + "001.jpg\")";
        
        
    }, 3000);
}