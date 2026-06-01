const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend"); // Keeps the Resend import you added

const app = express(); // Kept right here to fix the "app is not defined" issue

// Configure CORS to grant smooth access to your testing environment
app.use(
  cors({
    origin: [
      "https://web-portfolio-1-yfnm.onrender.com", 
      "http://localhost:3000"
    ],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Initialize your Resend instance using the API key hidden in your Render Environment settings
const resend = new Resend(process.env.RESEND_API_KEY);

// A simple root GET route used to wake up the Render instance when the user loads the portfolio
app.get("/", (req, res) => {
  res.status(200).send("Portfolio backend server is awake and running!");
});

app.post("/send-email", async (req, res) => {
  // Destructure the user's form input from the incoming request body
  const { name, surname, email, subject, message } = req.body;

  try {
    // Overwrite your old Nodemailer configuration with this native Resend API method
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's default sandbox domain
      to: 'barendbakker007@gmail.com', // Your target student inbox destination
      replyTo: email, // If you click 'Reply' in your inbox, it replies to the website visitor
      subject: subject || "Portfolio Contact Form",
      html: `
        <h3>You have received a new message from your portfolio website:</h3>
        <p><strong>Sender:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      ` // We transformed the plain text email layout into clean HTML formatting
    });

    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("RESEND ERRORSTACK:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// Dynamic port routing for Render runtime environment container
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running safely on port ${PORT}`);
});