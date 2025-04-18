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

    let ID = postBody.cusID;

    // save postBody in a txt file
    let fs = require('fs');
    let data = JSON.stringify(postBody);
    fs.writeFile('results/' +ID +'.txt', data, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
  response.send(postBody);

});

app.post('/clear_customer', (request, response) => {
    let postBody = request.body;
    console.log(postBody);
    response.send(postBody);
});

app.post('/find_customer', (request, response) => {
    let ID = request.body.cusID;
    let postBody = request.body;
    console.log(postBody);
    let fs = require('fs');
    let resultsPath = 'results/';
    let found = false;
    fs.readdirSync(resultsPath).forEach(file => {
        let fileContent = fs.readFileSync(resultsPath + file);
        let data = JSON.parse(fileContent);
        if (data.cusID == postBody.cusID) {
            found = true;
            response.send(data);
            fs.writeFile('results/' +ID +'.txt', JSON.stringify(postBody), (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }
    });
    if (!found) {
        response.send({error: 'No such customer'});
    }

});

app.post('/delete_customer', (request, response) => {
    console.log(request.body);
    let postBody = request.body;
    console.log(postBody);
    let fs = require('fs');
    let resultsPath = 'results/';
    let found = false;
    fs.readdirSync(resultsPath).forEach(file => {
        let fileContent = fs.readFileSync(resultsPath + file);
        let data = JSON.parse(fileContent);
        if (data.cusID == postBody.cusID) {
            found = true;
            fs.unlinkSync(resultsPath + file);
            response.send(data);
        }
    });
    if (!found) {
        response.send({error: 'No such customer'});
    }
});

let port = process.env.PORT || 1337;

// create the web server running on port 1337
let server = app.listen(port, function () {
    console.log("Server is running on port " + port);
});