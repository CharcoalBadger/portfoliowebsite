import React, { useState, useRef } from "react";
import "./footer.css";
import Credit from "./credit";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const [showCredit, setShowCredit] = useState(false);
  const contentRef = useRef(null); // Add this line

  const handleCreditsClick = () => {
    setShowCredit(!showCredit);
  };

  const handleBackgroundClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      handleCreditsClick();
    }
  };

  return (
    <div className="footer-container">
      <p>Copyright © {currentYear} William Douglas</p>
      <button className="footer-btn" onClick={handleCreditsClick}>
        Credits
      </button>
      {showCredit && (
        <Credit onClose={handleBackgroundClick} contentRef={contentRef} />
      )}
    </div>
  );
}
