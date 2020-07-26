ncFilePath="D:/ecmwfdown/test/2009/";
firstFileName="200901";



M=require("ming_node")
app=M.server();
app.listener(8888);

dealNcServerIp="localhost";
nodeAddress="http://localhost:8888";
areaGisFile=ncFilePath+"aos_algo_area_gis.csv"
okFileFist=[];

f1=function(){M.get(`http://${dealNcServerIp}:7011/setAreaGisFile`,u=>M.log(u),{areaGisFile:areaGisFile})}
f2=function(){M.get(`http://${dealNcServerIp}:7011/setNodeAddress`,u=>M.log(u), {nodeAddress:nodeAddress})}

function f3() {
    M.log("准备添加" + firstFileName + ".nc");
    M.get(`http://${dealNcServerIp}:7011/generateTxt`, function (d) {
            M.log(d)
        },
        {
            fileName: firstFileName,
            path: ncFilePath
        })
}




//设置行政文件地址
setTimeout(f1, 10);
//设置nc解析电脑的地址
setTimeout(f2, 2000);
//添加第一个nc文件
setTimeout(f3,6000);






app.get("/add",function (req,res) {
    M.log(req.param.fileName+"添加完成")
    okFileFist.push(req.param.fileName);
    fileName=getNewFileName(req.param.fileName);
    M.log("准备添加"+fileName+".nc")
    if(okFileFist.indexOf(fileName)>=0){
        while(1){
            M.sleep(1000);
            M.log(fileName+"已经加过,nc解析可能出现问题了");
        };
    }
    M.get(`http://${dealNcServerIp}:7011/generateTxt`,function (d) {
            M.log(d)
        },
        {
            fileName:fileName,
            path:ncFilePath
     })
    res.send("ok")
})






function getNewFileName(fileName) {
    if(!fileName.match(/^\d{6}$/)){
        return "xxxxxx";
    }
    if(fileName.substring(4,6)=="12"){
        return (Number.parseInt(fileName)+89).toString();
    }else{
        return (Number.parseInt(fileName)+1).toString();
    }
}
