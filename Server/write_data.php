<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
http_response_code(400);
// write the file to disk
$name = "data.csv";
file_put_contents($name, $post_data);