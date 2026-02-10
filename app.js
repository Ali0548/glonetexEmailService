const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv?.config();
const allowedOrigins = ['http://localhost:4001', 'https://sss-g-server.vercel.app', 'https://api.fitwellhub.com', 'http://localhost:3000'];

// Configure CORS middleware to allow only specified origins
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is in the list of allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  }
}));app.use(express.json())

app.get('/', (req,res)=>{return res.json({msg:"I am working"})} );

app.use('/fitwell/email', (req, res) => {
  
  const transporter = nodemailer.createTransport({
    service: process?.env?.SERVICE,
    host: process?.env?.HOST,
    port: process?.env?.PORT,
    secure: true, // Use SSL
    auth: {
      user: process?.env?.USER,
      pass: process?.env?.PASSWORD,
    },
  });

  // Define the email content
  const mailOptions = {
    from: process?.env?.USER, // Use your service's email address here
    to: req?.body?.email,
    subject: req?.body?.subject,
    html: req?.body?.html,
  };
  // const mailOptions = {
  //   from: 'solution.sales@glonetex.com', // Use your service's email address here
  //   to: 'abhai0548@gmail.com',
  //   subject: 'Hello from Nest Js',
  //   text: 'This is a test email sent from Nest JS using Nestmailer.',
  // };
  // Send the email
  
  transporter?.sendMail(mailOptions, (error, info) => {
    console.log("error====>", error)
    console.log("info=====>", info)
    if (error) {
      return res.json({status:false, msg:error})
    } else {
      return res.json({status:true, msg:info.response})
   
    }
  });
});

app.listen(5001, ()=>console.log("Listening on 5001"))

