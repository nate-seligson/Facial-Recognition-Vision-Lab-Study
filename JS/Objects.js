//anchored to the top middle
import {RandomLink} from "./Images.js";
import {colorpositions} from "./source.js";
var baseSize = 8;
let randomColor = () => Math.floor(Math.random()*16777215).toString(16);
export class Page{
    constructor(name, objs, obj_positions = colorpositions) {
        this.objs = objs;
        this.name = name;
        this.IsCorrect = null;
        this.OnComplete = null;
        this.unHideable = false;
        this.positions = obj_positions;
        var i = 0;
        this.objs.forEach(element => {
            element.page = this;
            element.position = obj_positions[i];
            i++;
        });
        this.HideAll();
        
    }
    HideAll(){
        if(this.unHideable == true){
            return;
        }
        this.objs.forEach(function(element){
            element.Hide();
        });
    }
    ShowAll(){
        this.objs.forEach(function(element){
            element.Show();
        });
    }
    Change(){
        if(this.unHideable == true){
            return;
        }
        this.objs.forEach(function(element){
            element.ChangeTo();
        });
    }
    ChangeBack(){
        this.objs.forEach(function(element){
            element.ChangeBack();
        });
    }
    ReadyToClick(){
        this.objs.forEach(function(element){
            element.readyToClick = true;
            var style = element.object.style;
            element.object.addEventListener("mouseover", function(){style.border = "thick solid green"})
            element.object.addEventListener("mouseout", function(){style.border = "none"})
        });
    }
    UnReadyToClick(){
        this.objs.forEach(function(element){
            element.readyToClick = false;
        });
    }
    Destroy(){
        this.objs.forEach(function(element){
            element.Destroy();
        });
    }
    WRONG(){
        this.IsCorrect = false;
        this.COMPLETE();
    }
    RIGHT(){
        this.IsCorrect = true;
        this.COMPLETE();
    }
    COMPLETE(){
        this.Destroy();
        this.OnComplete(this);
    }
    GetValues(){
        var i = 1;
        var name = this.name;
        const positions = {};
        this.objs.forEach(function(element){
            if(!element.changepath){
                positions[name + " static " + i.toString() + " position"] = element.position;
                positions[name + " static " + i.toString() + " value"] = element.path;
            }
            else{
                positions[name + " changing " + i.toString() + " position"] = element.position;
                positions[name + " changing " + i.toString() + " pre-change value"] = element.path;
                positions[name + " changing " + i.toString() + " post-change value"] = element.changepath;
            }
            i++;
        });
        return positions;
    }
    Shuffle(){
        var temp_positions = this.positions;
        for(var i = 0; i<this.objs.length; i++){
            if(this.objs[i].changepath){
                temp_positions.splice(i,1);
            }
        }
        this.objs.forEach(function(element){
            if(!element.changepath){
                var i = Math.floor(Math.random() * temp_positions.length);
                element.position = temp_positions[i]
                temp_positions.splice(i,1)
            }
        });
    }
}
export class Object{
    constructor(object){
        this.object = object;
        this.readyToClick = false;
        this.CreateObject();
    }
    CreateObject(){
        this.object = document.createElement(this.object);
        var style = this.object.style;

        document.getElementById("canvas").appendChild(this.object);
        this.object.addEventListener("click", this.Onclick.bind(this));

        style.position = "absolute";
        this.size = baseSize;
    }
    set position(position){
        this.positionx = position[0];
        this.positiony = position[1];

        this.object.style.left = position[0].toString() + "%";
        this.object.style.top = position[1].toString() + "%";
    }
    get position(){
        return "(" + this.positionx.toString() + "," + this.positiony.toString() + ")"
       }
    set size(size){
        this._size = size;
        this.object.style.width = this._size + "vw";
        this.object.style.height = this._size + "vw";
    }
    Hide(){
        this.object.style.display = "none";
    }
    Show(){
        this.object.style.display = "block";
    }
    Onclick(){
        if(this.readyToClick == false){
            return;
        }
        this.page.WRONG();
    }
    Destroy(){
        this.object.remove();
    }
    ChangeTo(foo){}
    ChangeBack(){}
}
export class ColorSquare extends Object{
    constructor(color = randomColor()){
        super("div");
        this.color = color;
        this.object.style.backgroundColor = this.color;
    }
    get path(){
        return this.color;
    }
}
export class ColorChange extends ColorSquare{
    constructor(color = randomColor(), changeColor = randomColor()){
        super(color);
        this.changeColor = changeColor;
        this.baseColor = color;
    }
    ChangeTo(color = this.changeColor){
        this.object.style.backgroundColor = color;
    }
    ChangeBack(){
        this.object.style.backgroundColor = this.baseColor;
    }
    Onclick(){
        if(this.readyToClick == false){
            return;
        }
        this.page.RIGHT();
    }
    get path(){
        return this.baseColor
    }
    get changepath(){
        return this.changeColor;
    }
}
export class RotateSquare extends Object{
    constructor(rotation = (Math.random()*360)){
        super("div");
        this.rotation = rotation;
        this.object.style.rotate= rotation + "deg";
        this.object.style.backgroundColor = "#000000";
    }
    set size(size){
        this._size = size;
        this.object.style.width = this._size + "vw";
        this.object.style.height = this._size * 0.25 + "vw";
    }
    get path(){
        return this.rotation;
    }
}
export class RotateChange extends RotateSquare{
    constructor(rotation = (Math.random()*360), changeRot = (Math.random()*360)){
        super(rotation);
        this.changeRot = changeRot;
        this.baseRot = rotation;
    }
    ChangeTo(rotate = this.changeRot){
        this.object.style.rotate = rotate + "deg";
    }
    ChangeBack(){
        this.object.style.rotate = this.baseRot + "deg";
    }
    Onclick(){
        if(this.readyToClick == false){
            return;
        }
        this.page.RIGHT();
    }
    get path(){
        return this.baseRot;
    }
    get changepath(){
        return this.changeRot;
    }
}
export class Image extends Object{
    constructor(src = RandomLink()){
        super("img");
        this.src = src;
        this.object.src = src;
    }
    set size(size){
        this._size = size;
        this.object.style.width = this._size * 1.5 + "vw";
        this.object.style.height = this._size + "vw";
    }
    get path(){
        return this.src.slice(29, 33);
    }
}
export class ImageChange extends Image{
    constructor(src = RandomLink(), changeSrc = RandomLink()){
        super(src);
        this.changeSrc = changeSrc;
        //bug fix preload
        var preload = new Image(this.changeSrc);
        preload.position = [99999,99999]

    }
    ChangeTo(changesrc = this.changeSrc){
        this.object.src = changesrc;
    }
    ChangeBack(){
        this.object.src = this.src;
    }
    Onclick(){
        if(this.readyToClick == false){
            return;
        }
        this.page.RIGHT();
    }
    get path(){
        return this.src.slice(29,33);
    }
    get changepath(){
        return this.changeSrc.slice(29, 33);
    }
}