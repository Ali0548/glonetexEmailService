const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json())
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // res.setHeader('Access-Control-Allow-Origin', 'http://glonetex.com/');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
// Create a transporter object using the provided SMTP settings
app.get('/', (req,res)=>{return res.json({msg:"I am working"})} );
app.use('/glonetex/email', (req, res) => {
  console.log( req.body)
  const transporter = nodemailer.createTransport({
    service: 'SMTP',
    host: 'smtp.dreamhost.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: 'solution.sales@glonetex.com',
      pass: '23Dr@mhO$t_23',
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'solution.sales@glonetex.com', // Use your service's email address here
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.html,
  };
  // const mailOptions = {
  //   from: 'solution.sales@glonetex.com', // Use your service's email address here
  //   to: 'abhai0548@gmail.com',
  //   subject: 'Hello from Nest Js',
  //   text: 'This is a test email sent from Nest JS using Nestmailer.',
  // };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({status:false, msg:error})

    } else {
      return res.json({status:true, msg:info.response})
   
    }
  });
});

app.listen(5001, ()=>console.log("Listening on 5001"))

