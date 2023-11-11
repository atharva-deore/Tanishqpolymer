const express = require("express");
const app=express();
const path = require("path");
const bodyparser = require("body-parser");
const user = require("./mongodb");

const port = 250;
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS

app.get('/',(req,res)=>{
    const param ={}
    res.render('login',param)
})

app.get('/signup',(req,res)=>{
    const param ={}
    res.render('signup',param)
})

app.post('/signup',(req,res)=>{
    var newdata= new user(req.body);

    newdata.save().then(()=>{
        res.send("Your Data has been Saved")
    })
    .catch(()=>{
        res.send("Your Data is not Saved Yet. Try Again !")
    })
    
    // res.render("home")
})

app.post('/login',async(req,res)=>{
    try{
        const check=await user.findOne({name:req.body.name});
        if(check.password === req.body.password){
            res.render("home")
        }

        else{
            res.send("Wrong Password")
        }
    }

    catch{
        res.send("user not found.")
    }
    
    // res.render("home")
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
