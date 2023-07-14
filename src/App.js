import React from "react";
import "./App.css";
// import Threejstest from "./cmp/3jstest";
// import Threejsdome from "./cmp/3jsdome";
// import Threejsbasic from "./cmp/3jsbasic";
// import Threejsfiber from "./cmp/3jsfiber";
import Navbar from "./cmp/navbar";
import Portfoliointro from "./cmp/portfoliointro";
import Project from "./cmp/project";
// import Contactform from "./cmp/contactform";
// import Footer from "./cmp/footer";
// import { Shaunophone } from "./cmp/shaunophone";
// import Portintro from "./cmp/portintro";

function App() {
  // const [isDarkMode, setDarkMode] = useState(true);

  return (
    <div>
      {/* <Threejsbasic /> */}
      {/* <Threejsfiber /> */}
      {/* <Threejstest /> */}
      {/* <Threejsdome /> */}
      <Navbar />
      <div className="portfolio-section">
        <Portfoliointro />
      </div>
      <Project />

      {/* <Contactform />

      <Footer /> */}
    </div>
  );
}

export default App;
