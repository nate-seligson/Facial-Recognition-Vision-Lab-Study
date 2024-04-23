import{pages} from "./source.js";
import { startTime, endTime, delta } from "./TimeHandler.js";
//wait
const wait = (n) => new Promise((resolve) => {if(spacebar_pressed == false){setTimeout(resolve, n)} else{resolve}});
var data = JSON.parse(sessionStorage.getItem("data"))
document.body.onkeyup = function(e) {
    if (e.key == " " && spacebar_pressed == false) {
        spacebar_pressed = true;
        Freeze();
    }
  }
const Run = async() =>{
    var Page = pages[i];
    if(spacebar_pressed == true){
        Freeze();
        return;
    }
    Page.ChangeBack();
    Page.ShowAll();
    await wait(1000);
    Page.HideAll();
    await wait(1000);
    Page.Change();
    Page.ShowAll();
    await wait(1000);
    Page.HideAll();
    await wait(1000);
    Run();
}
function Freeze(){
    var Page = pages[i];
    Page.unHideable = true;
    Page.ShowAll();
    Page.ReadyToClick();
    document.getElementById("instructions").innerHTML="Click the changing object.";
}
function OnComplete(Page){
    endTime();
    var displayText = "";
    data["Object"] = Object.assign(data["Object"], pages[i].GetValues());
    if(Page.IsCorrect == true){
        displayText = "Correct!"
        //collect data
        data["Time"][pages[i].name + " Time"] = delta;
    }
    else if (Page.IsCorrect == false){
        displayText = "Incorrect!";
        data["Time"][pages[i].name + " Time"] = "INCORRECT";
    }
    DisplayText(displayText);
}
const DisplayText = async(text)=>{
    var element = document.getElementById("bigtext");
    var button  = document.getElementById("nextbutton");
    var instructions = document.getElementById("instructions")
    element.innerHTML = text;
    button.style.display = "block";
    instructions.style.display = "none";

    button.onclick = function(){
        setTimeout(function(){NextTest();}, 3000)
        element.innerHTML = "";
        button.style.display = "none";
        instructions.style.display = "block";
        document.getElementById("instructions").innerHTML="Press SPACEBAR when you have found the changing object."
        i++;
        if(i > pages.length - 1){
            sessionStorage.setItem("data", JSON.stringify(data));
            window.location.href = "./thankyou.html"
            return;
        }
    }
}
function NextTest(){
    spacebar_pressed = false;
    Run();
    startTime();
}
var i = 0;
var spacebar_pressed = false;
//add completion function to each page
pages.forEach(element => {
    element.OnComplete = OnComplete;
});
setTimeout(function(){Run(); startTime();}, 3000);
