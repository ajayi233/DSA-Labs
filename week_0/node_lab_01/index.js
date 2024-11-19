const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require('querystring')

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
//create-user endpoint to console log the username
else if (pathName === '/create-user' && req.method === 'POST') {
  let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const username = parsedBody.username;

              //to handle any errors that may come up during username extraction
            if (username) {
                console.log('Username:', username);
            } else {
                console.log('Username not provided!');
            }

            res.writeHead(302, { Location: '/' }); // Redirect back to the homepage
            res.end();
  });
}

//to handle other routes which are not in our scope 
else {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found');
}


});



let port = 3000;
server.listen(port, "localhost", () => {
  console.log(`Console running on port: ${port}`);
});
