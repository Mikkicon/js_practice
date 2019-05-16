#!/usr/bin/env node
require("http")
  .createServer(function(req, res) {
    console.log("New connection");
    if (req.url == "/") {
      res.end(`
    <!DOCTYPE html>
    <html>
      <body></body>
    </html>
    <div id="demo">
      <h2>XMLHttpRequest();</h2>
      <button onclick="load()">change</button>
    </div>
    <script type="text/javascript">
      function load() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhttp.open("GET", "hello-world", true);
        xhttp.send();
      }
    </script>
    
        `);
    } else if (req.url === "/hello-world") {
      res.end("Hello world");
    } else {
      res.end("done");
    }
  })
  .listen(8080);
console.log("Started");
