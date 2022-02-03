const express = require("express");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.urlencoded({extended: true}));


app.post("/" , function(req , res){

  mailchimp.setConfig({
  apiKey: "insert_apikey here",
  server: "us20",
})

const listId = "ae9f97b286";
const subscribingUser = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    res.sendFile(__dirname + "/success.html");
   
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
        response.id
      }.`
    );
  }
   
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
    


});



app.get("/" , function(req, res){
   res.sendFile(__dirname+"/signup.html");
});


app.post("/failure" , function(req ,res){
    res.redirect("/");
})
app.use(express.static("public"));

app.listen(process.env.PORT, function(){
    console.log("server is running on port 3000");
})



