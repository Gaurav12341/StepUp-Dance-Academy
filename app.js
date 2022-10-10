const express=require('express')  // Import express
const path=require('path');  // Import path module
const mongoose= require('mongoose');
const app=express();
const port=8080;


//MONGODB STUFF
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdancemain');
}

const contactSchema = new mongoose.Schema({   //Schema are the variables we r going to store in the database with its data type
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);   //a collection named "contacts" will be made in the database

//EXPRESS SPECIFIC
app.use(express.static('static')) //to access static folder
app.use(express.urlencoded());


//PUG SPECIFIC
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home',params);
})
app.get('/about',(req,res)=>{
    const params={}
    res.status(200).render('about',params);
})
app.get('/services',(req,res)=>{
    const params={}
    res.status(200).render('services',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact',params);
})
app.post('/contact',(req,res)=>{
    const params={}
    var myData=new Contact(req.body)
    myData.save().then();
    res.send("Your Query will me handled very soon").catch(()=>{
        res.status(400).send("Your request was not recorded, Please try again Later")
    })
    

})


//START The server
app.listen(port,()=>{
    console.log("The application started successfully on: ",port);
})
