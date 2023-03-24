var express = require("express");
let bodyparser = require("body-parser");
var mongodb = require('mongodb');
var app = express();

app.use(express.json());

var MongoClient = mongodb.MongoClient;
var url = "mongodb://127.0.0.1:27017";

app.get('/',(req,res)=>{
    res.end("hello")
});

app.post('/save',(req,res)=>{
    let body = req.body;
     MongoClient.connect(url,(err, db)=>{
            if(err){
                res.end(JSON.stringify({status:"failed", data:err}));
            }
            var dbo = db.db("mongosample");
            dbo.collection("users").insertOne({name:body.name, email:body.email},(err,result)=>{
                if(err){
                    res.end(JSON.stringify({status:"failed", data:err}));
                }
            else{
                res.end(JSON.stringify({status:"success", data:result}));
            }
        })
    })
    
});
app.get('/list',(req,res)=>{
    let body = req.body;
     MongoClient.connect(url,(err, db)=>{
        var dbo = db.db("mongosample");
        dbo.collection("users").find({}).toArray((err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed", data:err}));
            }

            else{
                res.end(JSON.stringify({status:"success", data:result}));
            }
        })
    })
    
});
app.get('/get/:name',(req,res)=>{
    let body = req.body;
     MongoClient.connect(url,(err, db)=>{
        var dbo = db.db("mongosample");
        dbo.collection("users").findOne({name:req.params.name},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed", data:err}));
            }

            else{
                res.end(JSON.stringify({status:"success", data:result}));
            }
        })
    })
    
});

app.put('/update/:name',(req,res)=>{
    let body = req.body;
     MongoClient.connect(url,(err, db)=>{
        var dbo = db.db("mongosample");
        dbo.collection("users").updateOne({name:req.params.name},{$set:{name:body.name, email:body.email}},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed", data:err}));
            }

            else{
                res.end(JSON.stringify({status:"success", data:result}));
            }
        })
    })
})

app.delete('/delete/:name',(req,res)=>{
    let body = req.body;
     MongoClient.connect(url,(err, db)=>{
        var dbo = db.db("mongosample");
        dbo.collection("users").deleteOne({name:req.params.name},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed", data:err}));
            }

            else{
                res.end(JSON.stringify({status:"success", data:result}));
            }
        })
    })
    
});

    


app.listen(8081, ()=>{
    console.log("server running on http://localhost:8081/");
})