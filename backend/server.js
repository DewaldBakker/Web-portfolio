const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, surname, email, subject, message } = req.body;

  try {
    // UPDATED FOR GMAIL CONFIGURATION
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 465,
      secure: true,
      family: 4,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },
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

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});