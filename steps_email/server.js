const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());


app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "antoinenader0@gmail.com",
    pass: "cgcq hidp rizb atoo"
  },
  tls: {
    rejectUnauthorized: false, 
  },
});


app.post("/send-email", (req, res) => {
  const { fullName, phone, email, propertyType } = req.body;

  const mailOptions = {
    from: "Antoine Nader",
    to: "amanda-chaar@steps.com.qa",
    subject: "Contact Form Submission",
    text: `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nProperty Type: ${propertyType}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
