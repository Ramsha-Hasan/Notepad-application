var http= require('http');
var fs= require('fs');
var path= require('path');
var queryString = require('querystring');

var server = http.createServer(function(req,res){

    var qs = queryString.parse(req.url.split("?")[1]);
    var filePath = '.' + req.url;
    if (filePath == './'){
        filePath = './notepad.html';
    }
    var extname = path.extname(filePath);
    if(extname){
        var contentType = 'text/html';
        
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end(); 
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

    else{
        console.log(filePath)
        res.setHeader('Content-disposition', 'attachment; filename='+ qs.filename +'.txt');
        res.write(qs.textarea);
        console.log("File Sent: ", qs.textarea);
        res.end();
    }
});



server.listen(8000);
console.log("Server has started !");