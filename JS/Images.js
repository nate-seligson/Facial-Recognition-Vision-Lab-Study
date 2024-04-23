export var images = {
    "black": {
        "male": {
            "high": [],
            "low": [],
        },
        "female": {
            "high": [],
            "low": [],
        },
    },
    "white": {
        "male": {
            "high": [],
            "low": [],
        },
        "female": {
            "high": [],
            "low": [],
        },
    },
};
const tempall = [
    ["BFH"], 
    ["BFL"], 
    ["BMH"], 
    ["BML"], 
    ["WFH"], 
    ["WFL"], 
    ["WMH"], 
    ["WML"]
];
const races = ["black", "white"];
const genders = ["female", "male"];
const highlow = ["high", "low"];
function GrabLinks(){
    var fcd = "../FCD full stimulus set/";
    
    for(var i = 0; i<tempall.length; i++){
        var this_name = tempall[i][0];
        for(var j = 1; j<=10; j++){
            tempall[i].push(fcd + this_name + "/" + this_name + j.toString() + ".jpg");
        }
        tempall[i].splice(0, 1);
    }
}
function AssignDict(){
    var ii=0;
    for(var i = 0; i<2; i++){
        for(var j = 0; j<2; j++){
            for(var k = 0; k<2; k++){
                images[races[i]][genders[j]][highlow[k]] = tempall[ii];
                ii++;
            }
        }
    }
}
let random = () => Math.floor(Math.random() * 2);
let randomImage = () => Math.floor(Math.random() * 10);
let selected = []
export function RandomLink(){
    let img = images[races[random()]][genders[random()]][highlow[random()]][randomImage()];
    while(selected.includes(img)){
        img = images[races[random()]][genders[random()]][highlow[random()]][randomImage()];
    }
    selected.push(img)
    return img
}
export function RandomIn(str1, str2){
    let img = images[str1][str2][highlow[random()]][randomImage()]
    while(selected.includes(img)){
        img = images[str1][str2][highlow[random()]][randomImage()]
    }
    selected.push(img)
    return img
}
GrabLinks();
AssignDict();
var i = 0;

