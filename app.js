const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js")

const app = express();

let items = ["Buy Food" , "Cook Food" , "Eat Food"];
let workItems=[];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , (req , res)=>{
  
  let day = date.getDate();
    
    res.render("list" , {listTitle : day, newListItems : items});
    
});

app.get("/about" , (req, res)=>{
  res.render("about");
})

app.post("/" , (req , res)=>{
  
  let item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work" , (req,res )=>{
  res.render("list" , {listTitle : "Work List" , newListItems : workItems});
});



app.listen(3000 , ()=>{
    console.log("This server is running on port 3000.")
});