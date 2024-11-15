const http = require("http");
const path = require("path");
const fs = require("fs");

let htmlpath = path.join(__dirname, "index.html");
let userpath = path.join(__dirname, "users.html");
const server = http.createServer((req, res) => {
  let pathName = req.url;


  // for the index page
  if (pathName === "/") {
    res.writeHead(200, ("Content-type", "text/plain"));
    fs.readFile(htmlpath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(data);
      }
    });
  }

// for the user's page
  else if (pathName === "/users"){
    res.writeHead(200, ('Content-type', 'text/plain'))
    fs.readFile(userpath, 'utf8', (err, data) => {
      if(err){
        console.log(err);
      }
      else{
        res.end(data)
      }
    })
  }

  else if(pathName === '/create-user'){
    
  }
});

let port = 3000;
server.listen(port, "localhost", () => {
  console.log(`Console running on port: ${port}`);
});
