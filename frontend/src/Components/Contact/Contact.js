import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // 1. Instantly prevent the browser from reloading the page
    e.preventDefault();
    setLoading(true);

    const apiUrl = "https://web-portfolio-7ugg.onrender.com";

    try {
      // 2. Perform the actual network dispatch
      const response = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");

        setFormData({
          name: "",
          surname: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
      alert("Server error sending email");
    }

    setLoading(false);
  };

  return (
    <div id='contact' className="contact-container">
      <h2 className="contact-title"> Get in touch </h2> 
      
      <h2 className="contact-tagline"> Let's build<br />
      <em>something</em>
      <br />together.</h2> 

      <p className="contact-desc"> 
        Open to junior roles, freelance work, or collaborations. Whether it's a project idea or just a coffee chat about code — I'm in.
      </p>

      {/* Ensure the onSubmit handler is tied directly to the form element */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          required
        />

        {/* Keeping type="submit" ensures HTML5 validation triggers correctly */}
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
}

export default Contact;