var express = require("express");
var bodyparser = require("body-parser");
var multer = require("multer");
var cookie = require("cookie-parser");

var fs = require("fs");
var mysql = require("mysql");

var app = express();

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded());

app.listen(8081, () => {
    console.log("server is running at http://localhost:8081");
})

app.get("/", (req, res) => {
    let header = fs.readFileSync("header.html");
    let footer = fs.readFileSync("footer.html");
    fs.readFile("index.html", (err,data)=>{
        res.send(header.toString() + data.toString() + footer.toString());
    });
});


app.get("/create", (req, res) => {
    let header = fs.readFileSync("header.html");
    let footer = fs.readFileSync("footer.html");

    fs.readFile("create.html", (err,data)=>{
        res.send(header.toString() + data.toString() + footer.toString());
    });
});


app.post("/save", (req, res) => {
    let body = req.body;
    let id = body.data.id;
    let name = body.data.name;
    let email = body.data.email;
    let mobileno = body.data.mobileno;
    let city = body.data.city;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodecrud"
    });

    con.connect((err) => {
        if (err) {
            console.log(err);
        }
        var query;
        if (id == 0) {
            query = "insert into users (name,email,mobileno,city) values('" + name + "', '" + email + "', '" + mobileno + "', '" + city + "')";
        }
        else
        {
            query = "update users set name='" + name + "',email='" + email + "',mobileno='" + mobileno + "',city='" + city + "' where id=" + id;
        }
        con.query(query, (err, result) => {
            console.log("inserted");
            res.send("success");
        })

    })

})


app.post("/delete", (req, res) => {
    let body = req.body;
    let id = body.data.id;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodecrud"
    });

    con.connect((err) => {
        if (err) {
            console.log(err);
        }
        var query;
       
            
        query = "delete from users where id=" + id;
    
        con.query(query, (err, result) => {
            console.log("deleted sucessfully");
            res.send("success delete");
        })
    })
})


app.post("/get", (req, res) => {
    let body = req.body;
    let id = body.data.id;
   

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodecrud"
    });

    con.connect((err) => {
        if (err) {
            console.log(err);
        }
        var query;
        if (id == 0) {
            query = "select * from users";
        }
        else {
            query = "select * from users where id=" + id;
        }
        con.query(query, (err, result) => {
            console.log("inserted");
            res.send({data:result});
        })

    })

})







