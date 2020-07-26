# Ming_nodeJS

1.M_node.js  

该文件已上传到npm服务器
npm install ming_node  参看帮助,即可直接使用



a.

M_mock.js 搭建简易服务器

var app=M.server();
app.listener(3000);
app.post('/add', function (req,res) {
        console.log(req.param,req.url);
        res.send(M.result({a:7,data:"添加成功"}));
    } 
)


b.
M_mock.js 模拟浏览器发送post请求测试后台接口
M.post("http://localhost:8080/coder/save",
    u=>console.log(u),
    {
        name:"wang",
        sex:"男",
        hobby:"乒乓"
    }
    ,
    {'Content-Type': 'application/json'}
)



2.M_mock.js  

对jquery的ajax方法进行重写,模拟M_node.js中的服务端方法
用于浏览器,直接<script>引入即可用,它依赖jQuery,用于在浏览器里模拟服务器

无论是服务器，还是浏览器都可以有相同的写法-----------------------------------------
克隆下代码,直接用浏览器打开M_mockTest.html在控制台就可以看效果

毕竟在浏览器里执行下面代码是假的,其原理就是重写了jQuery的$.ajax方法,所以只能用jQuery发ajax才行,地址栏是不行的,
借助浏览器的各种存储
这样很方便前端mock数据,或制作纯前端应用





