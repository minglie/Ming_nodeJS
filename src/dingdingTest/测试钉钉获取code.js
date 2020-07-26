var M=require('M_node')
var https = require('https');
var url_module=require('url');
var http=require('http');

M.resultObj=null;



//1.获取扫码后的code
var server=http.createServer(function (request, response) {


    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("0.code-->OOKK");

}).listen(7001);

console.log('等用户扫码...');


