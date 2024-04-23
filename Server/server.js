export function sendJSON(InputData){
	var data = Object.assign({}, InputData["Personal"], InputData["Object"], InputData["Time"]);
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8000/cgi-bin/server2.cgi";
    // open a connection 
    xhr.open("POST", url, true);
    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            // Print received data from server
            document.getElementById("Recieve").innerHTML = "ello!";
        } else {
            console.error('Error:', xhr.status);
        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(data);

    // Sending data with the request
    xhr.send(data);
}