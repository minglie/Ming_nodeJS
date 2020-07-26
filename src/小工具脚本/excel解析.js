var xlsx = require('node-xlsx');
var M=require("ming_node");
var fs = require('fs');

var fs = require('fs');
var path = require('path');


var filePath = path.resolve('D:\\S');

fileArray=[];
//调用文件遍历方法
fileDisplay(filePath);
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                            o={};
                            o.path=filedir;
                            fileArray.push(o);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}







setTimeout(()=>{
    firstLineArray=[];
    for(let i=0;i<fileArray.length;i++){
        fileArray[i].firstLine=xlsx.parse(fileArray[i].path)[0].data[0].toString();
        firstLineArray.push(fileArray[i].firstLine);
    }

    fileIndex=0;
    resultNameArray=[];
    firstLineSet=new Set(firstLineArray);
    firstLineSet.forEach(function (element, sameElement, set) {
        fileIndex++;
        for(let i=0;i<fileArray.length;i++){
            if(element==fileArray[i].firstLine) {
                console.log(fileArray[i].path+"|"+fileArray[i].firstLine+"拷贝到"+"文件"+fileIndex);
                M.mkdir("文件"+fileIndex)
                fs.writeFileSync("文件"+fileIndex+"/"+i+path.parse(fileArray[i].path).base, fs.readFileSync(fileArray[i].path));
            }
        }
    });



}, 1000);






























