var M=require('M_node')

var url_module=require('url');
var http=require('http');
var ding={};

//1.获取扫码后的code
var server=http.createServer(function (request, response) {
    if(M.i==1) return;
    M.i=1;
    var urlObj=url_module.parse(request.url,true);
    ding.code=urlObj.query.code;
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("0.code-->"+ ding.code);
    console.log("0.code-->"+ ding.code)

}).listen(7001);

console.log('等用户扫码...');


