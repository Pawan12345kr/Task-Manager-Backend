const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();

const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    fs.readdir('./files', function(err,files){
        res.render('index',{files: files});
    })
})

app.get('/files/:finename', function(req, res){
    fs.readFile(`./files/${req.params.finename}`,"utf-8", function(err,filedata){
        res.render('show', {filename:req.params.finename, filedata:filedata});
        
    })
})

app.get('/edit/:finename', function(req, res){
    res.render('edit',{filename:req.params.finename});
})

app.post('/edit', function(req,res){
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,(err)=>{
        res.redirect('/');
    })
    
})

app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err)=>{
        res.redirect('/')
    })
    
})

app.listen(3000, function(){
    console.log("app is running at port 3000");
})