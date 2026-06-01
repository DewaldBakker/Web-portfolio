const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Configure CORS to grant smooth access to your Vercel deployment and local testing environment
app.use(
  cors({
    origin: [
      "https://web-portfolio-1-yfnm.onrender.com", // Replace with your real live Vercel URL
      "http://localhost:3000"
    ],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// A simple root GET route used to wake up the Render instance when the user loads the portfolio
app.get("/", (req, res) => {
  res.status(200).send("Portfolio backend server is awake and running!");
});

app.post("/send-email", async (req, res) => {
  const { name, surname, email, subject, message } = req.body;

  try {
    // Production configuration optimized for Gmail outbound routing
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,         // Switch from 465 to 587
  secure: false,     // MUST be false when using port 587
  family: 4,         // Explicitly forces IPv4 routing to bypass Render socket hiccups
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Prevents security gateway drops on cloud clusters
  }
});

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the email straight to your own inbox
      replyTo: email, // Clicking 'Reply' in your email client will reply to the sender instead of yourself
      subject: subject || "Portfolio Contact Form",
      text:
        `You have received a new message from your portfolio website:\n\n` +
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

// Dynamic port routing for Render runtime environment container
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running safely on port ${PORT}`);
});