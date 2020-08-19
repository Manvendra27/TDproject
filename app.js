const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const fs = require('fs');
const path = require('path');
const { json } = require('express');
const filename = './db.json';

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("."));


app.get("/login", (req,res) => {
    
    res.sendFile(__dirname + '/login.html')
});

app.get("/register", (req,res) => {
    
    res.sendFile(__dirname + '/register.html')
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
            res.end()
        }
        if (req.body.password != req.body.cnfpass) {
            res.send("password doesnt match");
            res.end();
        }
    })


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    

                    

                    user.password = hash;
                    user.cnfpass = hash;

                    db.users.push(user);

                    fs.writeFile(filename,JSON.stringify(db,null,'\t'),(err) => {
                     if(err) console.log(err);
                     res.send('User added!');
        
        
                    
            })
                });
            });

            
    })
    
    // route for login

    app.post("/login", (req , res)=> {

        let user = req.body;
        let data = fs.readFileSync(filename);
        let db = JSON.parse(data);
        let pass = req.body.password;
        
        
        
        

        db.users.forEach(user => {
            if (user.email === req.body.email){
                
                bcrypt.compare(pass,user.password, function(err, results){
                    if(err){
                        throw new Error(err)
                     }
                     if (results) {
                        return res.status(200).json({ msg: "Login success" })
                    } else {
                        return res.status(401).json({ msg: "Invalid credencial" })
                    }
                   })
                
            }
            
        })
        
        
        

        
        


    })

app.listen(3000, () => console.log("server running"));
