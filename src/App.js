import React, { useState } from "react";
import "./App.css";
import Navbar from "./cmp/navbar";
// import Portfoliointro from "./cmp/portfoliointro";
import Project from "./cmp/project";
// import Contactform from "./cmp/contactform";
// import Footer from "./cmp/footer";

function App() {
  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <div className="main">
      <Navbar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      {/* <div className="portfolio-section">
        <Portfoliointro isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      </div> */}

      <Project />

      {/* <Contactform />

      <Footer /> */}
    </div>
  );
}

export default App;
