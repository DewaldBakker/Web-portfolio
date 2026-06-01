const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Open global CORS access to allow localhost and your netlify/github pages frontend
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, surname, email, subject, message } = req.body;

  try {
    // Production configuration optimized for Render outbound channels
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Must be false for port 587
      family: 4,     // Explicitly forces IPv4 routing lanes to bypass network socket failures
      auth: {
        user: process.env.OUTLOOK_EMAIL,     // Stays flexible to match Render variables
        pass: process.env.OUTLOOK_PASSWORD,  // Stays flexible to match Render variables
      },
      tls: {
        rejectUnauthorized: false // Bypasses security gateway drops on cloud clusters
      }
    });

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL, 
      to: process.env.OUTLOOK_EMAIL,   
      replyTo: email, 
      subject: subject || "Portfolio Contact Form",
      text: `You have received a new message from your portfolio website:\n\n` +
            `Sender: ${name} ${surname}\n` +
            `Email: ${email}\n\n` +
            `Subject: ${subject}\n` +
            `Message:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("EMAIL ERRORSTACK:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// Dynamic port routing for Render runtime container
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running safely on port ${PORT}`);
});