var bar = document.getElementById("loadingbar");
var but = document.getElementById("but")
var startTime = Date.now()
var i = 0;
var maxWidth = 15
var seconds_to_load = 8000
function load(){
    if(i > seconds_to_load){
        but.style.display = "block"
        return
    }
    i++;
    bar.style.width = maxWidth * (i/seconds_to_load) + "vw";
}
load()
setInterval(load, 1)