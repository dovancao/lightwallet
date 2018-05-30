const express = require('express');

let app = express();

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/html/index.html");
});


app.listen(5000, function(err){
    if(err) console.log(err);
    else console.log("server is up!");
});