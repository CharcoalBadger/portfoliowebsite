import React from "react";
import "./App.css";
// import Threejstest from "./cmp/3jstest";
import Threejsdome from "./cmp/3jsdome";
// import Threejsfiber from "./cmp/3jsfiber";
// import Navbar from "./cmp/navbar";
// import Portfoliointro from "./cmp/portfoliointro";
// import Project from "./cmp/project";
// import Contactform from "./cmp/contactform";
// import Footer from "./cmp/footer";
// import { Shaunophone } from "./cmp/shaunophone";
// import Portintro from "./cmp/portintro";

function App() {
  // const [isDarkMode, setDarkMode] = useState(true);

  return (
    <div className="main">
      {/* <Threejsfiber /> */}
      {/* <Threejstest /> */}
      <Threejsdome />
      {/* <Navbar isDarkMode={isDarkMode} setDarkMode={setDarkMode} /> */}
      {/* <div className="portfolio-section">
        <Portfoliointro isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      </div> */}
      {/* <Portintro />

      <Project /> */}

      {/* <Shaunophone /> */}

      {/* <Contactform />

      <Footer /> */}
    </div>
  );
}

export default App;
