const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_EMAIL||'601829@student.belgiumcampus.ac.za',
        pass: process.env.OUTLOOK_PASSWORD||'BC64@Bakker2025',
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.OUTLOOK_EMAIL||'601829@student.belgiumcampus.ac.za',
      subject: subject || "No Subject",
      text: `From: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});