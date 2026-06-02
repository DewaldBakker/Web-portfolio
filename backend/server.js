const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend"); // Keeps the Resend import you added

const app = express(); // Kept right here to fix the "app is not defined" issue

// Configure CORS to grant smooth access to your testing environment
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow local development or requests with no origin (like mobile apps/Postman)
      if (!origin || origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      
      // Allow ANY Vercel deployment domain automatically
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      
      // If it's a completely different domain, reject it
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());


const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.status(200).send("Portfolio backend server is awake and running!");
});

app.post("/send-email", async (req, res) => {

  const { name, surname, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER, 
      replyTo: email,
      subject: subject || "Portfolio Contact Form",
      html: `
        <h3>You have received a new message from your portfolio website:</h3>
        <p><strong>Sender:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      ` 
    });

    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("RESEND ERRORSTACK:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running safely on port ${PORT}`);
});