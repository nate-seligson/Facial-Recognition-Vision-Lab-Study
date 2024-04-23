from http.server import BaseHTTPRequestHandler, HTTPServer
from io import BytesIO
import csv;
import json
class HTTPRequestHandler(BaseHTTPRequestHandler):

    # POST method
    def do_GET(self):
       if self.path == '/':
           self.path = '/index.html'
       try:
           file_to_open = open(self.path[1:]).read()
           self.send_response(200)
       except:
           file_to_open = "File not found"
           self.send_response(404)
       self.end_headers()
       self.wfile.write(bytes(file_to_open, 'utf-8'))
    def do_POST(self):
        self.send_response(200) # arbitrary
        self.send_header('Content-type', 'text/plain')
        self.send_header('Access-Control-Allow-Origin', '*')  # Adjust the origin as needed
        self.end_headers()
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.wfile.write(b'Data received by server.')
        if len(body) > 0:
            self.write(json.loads(body.decode('utf-8')))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')  # Adjust the origin as needed
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    def write(self, data):
        data_file = open('data_file.csv', 'a')
        csv_writer = csv.writer(data_file)
        csv_writer.writerow(data.keys())
        csv_writer.writerow(data.values())
        data_file.close()



def run(server_class=HTTPServer, handler_class=HTTPRequestHandler, port=3000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()
