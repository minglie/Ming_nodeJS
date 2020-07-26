var request = require("request");
var M=require("ming_node")

var applicationConfig=M.getObjByFile("../../applicationConfig.json");

var Neo4j={};

Neo4j.ip="127.0.0.1";
Neo4j.uri=`http://${Neo4j.ip}:7474/db/data/transaction/commit`;

/**
 *返回rest原始的结果集
 */
Neo4j.doCypher=function(query, params) {
    return new Promise(function(reslove,reject){
        request.post({
                uri:   Neo4j.uri,
                json: {statements: [{statement: query, parameters: params}]}
            },
            function (err, res, body) {

                if(err){
                    M.appendFile(applicationConfig.err_log_path,err+"\n");
                }
                if(body.errors.length>0){
                    M.appendFile(applicationConfig.err_log_path,JSON.stringify(body.errors)+"\n");
                    console.error(body.errors);
                }
                reslove(body.results);

            })
    });
}


/**
 *生成添加节点的Cypher
 */
Neo4j.getAddNodeCypher=function(lable,obj){
    let cypher=`CREATE (n:${lable}${M.JSOM_Stringify(obj)})`;
    return cypher;
}

/**
 *对返回结果直接封装成对象
 */
Neo4j.cypher= async function(query, params) {
    var results= await Neo4j.doCypher(query, params);
    results=results[0];
    var objList=[];
    for(let j=0;j<results.data.length;j++){
        var obj={};
        for(let k=0;k<results.data[j].row.length;k++){
            obj[results.columns[k]]=results.data[j].row[k]
        }
        objList.push(obj)
    }
    return objList;
};





module.exports=Neo4j;

if(0)
    +async function(){
        k= await Neo4j.doCypher(`CREATE (zw:KNOW { name: \'qqqqqqqqqqqqq\'})`)
        console.log(JSON.stringify(k))
    }();
