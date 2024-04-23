var StartTime;
var EndTime;
export var delta;
export function startTime(){
    StartTime = Date.now();
}
export function endTime(){
    EndTime = Date.now();
    delta = (EndTime-StartTime)/1000;
}