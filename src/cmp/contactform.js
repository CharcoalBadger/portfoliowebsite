import React from "react";
import "./contactform.css";

export default function Contactform() {
  return (
    <div className="contact-container">
      <h3>Let's work together</h3>
      <div className="contact-inner">
        <div className="social-container">
          <div className="contact-logo-container">
            <a href="mailto:wwdouglas@hotmail.co.uk">
              <img src="email-color.svg" alt="logo7" className="contact-logo" />
              wwdouglas@hotmail.co.uk
            </a>
          </div>
          <div className="contact-logo-container">
            <a href="https://github.com/yourusername">
              <img
                src="github-color.svg"
                alt="logo8"
                className="contact-logo"
              />
              Github
            </a>
          </div>
          <div className="contact-logo-container">
            <a href="https://www.linkedin.com/in/yourusername">
              <img
                src="linkedin-color.svg"
                alt="logo9"
                className="contact-logo"
              />
              LinkedIn
            </a>
          </div>
        </div>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              aria-label="Name"
            />
          </p>
          <p>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              aria-label="Email"
            />
          </p>
          <p>
            <textarea
              name="message"
              placeholder="Your Message*"
              aria-label="Your Message"
            ></textarea>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    </div>
  );
}
