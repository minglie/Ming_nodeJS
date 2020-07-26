var M_utils = function(){
    function f0(){
       console.log("f0")
    }

    function reg(space,obj){//命名空间
        var namespace = exports[space] || {};
        for(var key in obj){
            namespace[key] = obj[key];
        }
        exports[space] = namespace;
    }

    var exports = {
        reg,
        f0
    };
    return exports;
}();


M_utils.reg("f1",function(){//文件类型

    function f11(){
        console.log("f11")
    }

    var exports = {
        f11
    }
    return exports;
}());


M_utils.reg("f2",function(){//文件类型
    function f21(){
        console.log("f21")
    }
    function f22(){
        console.log("f22")
    }
    var exports = {
        f21,
        f22
    }
    return exports;
}());