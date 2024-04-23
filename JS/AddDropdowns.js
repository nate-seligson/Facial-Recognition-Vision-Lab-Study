var data = {
    "Personal":{},
    "Object":{}, 
    "Time":{}, 
    };
const forms = {
    "Race" : [
        "White", 
        "Black/African American", 
        "Hispanic/Latinx", 
        "Indigenous/Native American", 
        "Asian", 
        "Pacific Islander", 
        "Other", 
    ],
    "Gender":
    [
        "Male",
        "Female",
        "Non-Binary",
    ],
    "Age (Years)": 
        Array.from({length: 100}, (_, i) => i + 1),
    "Education":
    [
        "Some Highschool",
        "Highschool diploma or GED",
        "Some College",
        "Associate Degree",
        "Bachelor Degree",
        "Masters Degree",
        "Professional Degree",
        "Doctorate Degree",
    ],
    "Prolific ID": ""

}
const keys = Object.keys(forms);
const values = Object.values(forms);
function BaseOption(){
    const Option = document.createElement("option")
    Option.value = "null"
    Option.innerHTML = "Select..."
    return Option;
}
function EndOption(){
    const Option = document.createElement("option")
    Option.value = "Prefer not to answer"
    Option.innerHTML = "Prefer not to answer"
    return Option;
}
function AddtoScreen(Title, Select){
    const Div = document.createElement("div");
    Div.appendChild(Title);
    Div.appendChild(Select);
    Div.style.display = "inline-block";
    Div.style.padding = "20"
    Div.style.margin = "auto"
    document.getElementById("main").appendChild(Div);
}
function Submit(){
    for(var i = 0; i<keys.length; i++){
        let val = document.getElementById(keys[i]).value;
        data["Personal"][keys[i]] = val
        if(val == "null" || val == ""){
            alert("Please fill out all fields!")
            return;
        }
    }
    sessionStorage.setItem("data", JSON.stringify(data));
    window.location.href = "./instructions.html"
}
for(var i = 0; i<keys.length-1; i++){
    const Title = document.createElement("h2");
    Title.innerHTML = keys[i]
    const Select = document.createElement("select");
    Select.style.fontSize = "1vw"
    Select.id = keys[i]
    Select.appendChild(BaseOption());
    for(var j = 0;  j<values[i].length; j++){
        const Option = document.createElement("option")
        Option.value = values[i][j];
        Option.innerHTML = values[i][j];
        Select.appendChild(Option);
    }
    Select.appendChild(EndOption())
    AddtoScreen(Title, Select)
}
const Title = document.createElement("h2");
Title.innerHTML = keys[keys.length-1]
const Select = document.createElement("input");
Select.style.fontSize = "1vw"
Select.id = keys[keys.length-1]
AddtoScreen(Title, Select)
