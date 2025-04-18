// create express object from express module
let express = require('express');
// create body parser object from body-parser package
let bodyParser = require('body-parser');

// call express constructor to create express application object
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// create a handler (using an arrow function) for the HTTP GET request
// use the __dirname global value to create fully qualified url
app.get('/', (request, response) => response.sendFile(__dirname + "/index.html"));

// create a handler (using an arrow function) for the HTTP POST request
app.post('/get_customer', (request, response) => {
    let postBody = request.body;

    console.log(postBody);

    // save postBody in a txt file
    let fs = require('fs');
    let data = JSON.stringify(postBody);
    fs.writeFile('file_new.txt', data, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
  response.send(postBody);

});

let port = process.env.PORT || 1337;

// create the web server running on port 1337
let server = app.listen(port, function () {
    console.log("Server is running on port " + port);
});