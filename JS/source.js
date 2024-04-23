import {ColorSquare, ColorChange, Page, Image, ImageChange, RotateSquare, RotateChange} from "./Objects.js";
import {RandomIn} from "./Images.js"
export var colorpositions = [
    [65,50],
    [25,25],
    [70,20],
    [10,80],
    [80,75],
    [40,60],
    [50, 5],
    [15, 55],
    [5,20]
]
var rotatepositions = [
    [50,50],
    [70,20],
    [30,40],
    [25,80],
    [60,75],
    [30,10],
    [10,85],
    [75,75],
    [10,10],
]
export var racepositions = [
    [65,60],
    [20,20],
    [70,20],
    [10,80],
    [80,75],
    [40,60],
    [50, 15],
    [15, 55],
    [5,30]
]
export var pages = [
    new Page(
        "Colors",
        [
            new ColorSquare("#32a852"), 
            new ColorChange("#bfab28", "#54cc7c"),
            new ColorSquare("#a2a832"),
            new ColorSquare("#fa6161"),
            new ColorSquare("#464c7d"),
            new ColorSquare("#ffb473"),
            new ColorSquare("#cc7e52"),
            new ColorSquare("#a84795"),
            new ColorSquare("#7de1e3"),
        ],
        colorpositions
    ),
    new Page(
        "Orientation",
        [
            new RotateSquare(-60),
            new RotateChange(20,300),
            new RotateSquare(200),
            new RotateSquare(160),
            new RotateSquare(-35),
            new RotateSquare(80),
            new RotateSquare(72),
            new RotateSquare(33),
            new RotateSquare(97),
        ],
        rotatepositions
    ),
    new Page(
        "Race",
        [
            new ImageChange(),
            new Image(RandomIn("black", "male")),
            new Image(RandomIn("black", "male")),
            new Image(RandomIn("black", "female")),
            new Image(RandomIn("black", "female")),
            new Image(RandomIn("white", "male")),
            new Image(RandomIn("white", "male")),
            new Image(RandomIn("white", "female")),
            new Image(RandomIn("white", "female")),

        ],
        racepositions
    )
];
pages[pages.length-1].Shuffle();
var temp_pages = pages.slice();
if(Math.random() > 0.5){
    pages[0] = temp_pages[1]
    pages[1] = temp_pages[0]
}