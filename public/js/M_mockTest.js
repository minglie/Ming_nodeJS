app.begin(function (req, res) {
    console.log("服务器收到参数-->",req.param,req.url,req.method)
});


app.end(function (data) {
    console.log("服务器响应参数-->",data)
});



app.post('/add', function (req,res) {


        res.send(M.result("添加成功"));
    }
)


app.get('/delete', function (req,res) {


      res.send(M.result("删除成功"));
    }
)


app.post('/update', function (req,res) {


            res.send(M.result("修改成功"));
    }
)


app.get('/listAll', function (req,res) {


        res.send(M.result("查询所有"));
    }
)


app.get('/getById', function (req,res) {



         res.send(M.result("根据Id查询"));
    }
)



app.get('/zfA', function (req,res) {


             res.send({a:78});
    }
)

