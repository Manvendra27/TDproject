const express = require('express');
const bcryptjs = require('bcryptjs');
const app = express();
const fs = require('fs');
const path = require('path');
const { json } = require('express');
const filename = './db.json';

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("."));

// app.get('/style.css', function(req, res) {
//     res.sendFile(__dirname + "/" + "style.css");
//   });

app.get("/login", (req,res) => {
    
    res.sendFile(path.join(__dirname + '/login.html'))
});

app.get("/register", (req,res) => {
    
    res.sendFile(path.join(__dirname + '/register.html'))
});

//route for registration

app.post("/register", (req,res) => {

    let user = req.body;
    let data = fs.readFileSync(filename);
    let db = JSON.parse(data);
    let email = req.body.email;

    db.users.forEach(user => {
        if(user.email === email) {
            res.send("Email already exists");
        }
        if (req.body.password != req.body.cnfpass) {
            res.send("password doesnt match")
        }
    })
             db.users.push(user);

            fs.writeFile(filename,JSON.stringify(db,null,'\t'),(err) => {
             if(err) console.log(err);
             res.send('User added!');
    })
    })
    
    // route for login

    app.post("/login", (req , res)=> {

        
        let data = fs.readFileSync(filename);
        let db = JSON.parse(data);
        let password= req.body.password;
        let email= req.body.email;

        db.users.forEach(user => {
            if ( user.email === email && user.password === password ) {
                // res.sendFile(path.join(__dirname + '/index.html'));
                res.send("Successful login");
            }
            else {
                res.send("Wrong credentials!!");
            }
        })


    })

app.listen(3000, () => console.log("server running"));