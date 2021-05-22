const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status:'subscribed',
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/91b638a781";
const options = {
  method: "POST",
  auth: "jerryjos:8693acd1f1439f1957e7f95168578515-us6"
}

const request = https.request(url,options, function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
console.log(firstName,lastName,email);


});

app.listen(3000,function() {
  console.log("Server is running on port 3000");
});

// 8693acd1f1439f1957e7f95168578515-us6
// 91b638a781
