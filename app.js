const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { post } = require("request");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ] 
    };

    const jsondata =JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/8c75f216cf";

    const Option = {
        method: "POST",
        auth: "neerbhat98:13d4a3ac471eb896433e2decbd0dd126-us7"
    }



    
    const request = https.request(url, Option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsondata);
    request.end();

    console.log(firstName, lastName, email);
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


var server = app.listen(process.env.PORT || 8081, function() {
    console.log(new Date().toISOString() + ": server started on port 8081");
});


//api keys

// 13d4a3ac471eb896433e2decbd0dd126-us7

//list ID
// 8c75f216cf

// https://mandrillapp.com/api/1.0/users/ping