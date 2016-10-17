 var express  = require('express');
    var app      = express();    

    // configuration 
    app.use(express.static(__dirname + '/public'));                 

    // listen 
    app.listen(8080);
    console.log("Listening on port 8080");
	
	   app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/views/index.html');
    });
