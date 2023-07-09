//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/index.html", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/a23d9d5fbe";

  const options = {
    method: "POST",
    auth: "narniano:b7cf2916cbd7e1c7a3a509e27a9e9ad7-us18",
  };

  const request = https.request(url, options, function (response) {

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/sucess.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }


    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });


  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT, function () {
  console.log("A porta 3000 está funcionando.");
});

//API
//b7cf2916cbd7e1c7a3a509e27a9e9ad7-us18

//List ID
//a23d9d5fbe
