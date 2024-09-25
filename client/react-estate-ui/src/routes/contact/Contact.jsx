import "./contact.scss";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [messageStatus, setMessageStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID from .env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID from .env
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Public key from .env
        {
          user_name: form.current.user_name.value,
        }
      )
      .then(
        () => {
          setMessageStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setMessageStatus(`Failed to send message: ${error.text}`);
        }
      );
  };

  return (
    <div className="Contact">
      <div className="Form">
         <div className="Header"> 
         <h2>Contact Form</h2>
        <p>
          We would love to hear from you! Please fill out the form below with
          your name, email, and message, and we will get back to you as soon as
          possible.
        </p>
         </div>
        <div className="FormInputs"> 
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="user_name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="user_email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required />

          <button type="submit" className="send-button">
            Send
          </button>

          {messageStatus && <p className="message-status">{messageStatus}</p>}
        </form>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Contact;
