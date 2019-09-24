var convert = require('xml-js');
var http = require('http');
var express = require('express');
var fs = require('fs');


var server = http.createServer();
server.listen(3000, function() {
        console.log('run');

});


server.on('request', function(req, res){
        var reqData = '';

        var result = http.get({
          host: 'www.kma.go.kr',
          path: '/weather/forecast/mid-term-rss.jsp?stnId=108'
        }, function(xmlRes) {
                xmlRes.setEncoding('utf8');
                xmlRes.on('data', function(data) {
                        reqData +=data;
                });

                xmlRes.on('end', function(){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.end(reqData);
                        console.log(reqData);
                        fs.writeFile('XMLFile.xml', reqData, 'utf8', function(error) {} );
                });


        });

        result.on ('error', function(err) {
                console.log(err.message);
        });

});






/*
var xml =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<note importance="high" logged="true">' +
        '    <title>Happy</title>' +
        '    <todo>Work</todo>' +
        '    <todo>Play</todo>' +
        '</note>';
var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
console.log(result1, '\n', result2);
*/