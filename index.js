const express = require('express');
const path = require('path');
const { title } = require('process');

const port = 8000;

const db = require('./config/mongoose.js');
const Contact = require('./models/contact.js');
const { name } = require('ejs');
const { Console } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));

// app.use(function(req, res, next){
//     req.myName="Jarvis";
//     console.log(req);
//     console.log("MiddleWare 1 hoon main");
//     next();
// });

// app.use(function(req, res, next){
//     console.log("MiddleWare 2 hoon main");
//     console.log("Middleware 2 se main bol rha hoon ki mera naam "+req.myName+" hai");
//     next();
// })

// var contactList = [
//     {
//         name: "Keshav",
//         phone: "1001010010"
//     },
//     {
//         name: "Rahul",
//         phone: "8512072405"
//     },
//     {
//         name: "Poly",
//         phone: "5432167890"
//     },
//     {
//         name: "Mark",
//         phone: "0987654321"
//     }
// ];

// contactList = [];

app.get('/', function(req, res){
    // return res.render('home', {
    //     title: "This is a page",
    //     contact_list: contactList
    // }); 
    Contact.find({}).then (contacts=>{
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        })
    });
});

app.get('/practice', function(req, res){
    
    return res.render('practice', {
        title: "EJS Practice"
    })
});

app.post('/createcontact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // res.redirect('/');

    //another method
    // contactList.push(req.body);
    const newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone
    });
    newContact.save();

    return res.redirect('back');
});

app.get('/delete-contact/', async (req, res)=>{
    let id = req.query.id;
    await Contact.findByIdAndDelete({_id: id});
    return res.redirect('back');
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex, 1);
    // }
});

app.listen(port, function(err){
    if(err){
        console.log("kuch gadabad hai daya");
    }
    console.log("server run kr rha hai");
});