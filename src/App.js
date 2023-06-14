import "./App.css";
// import Navbar from "./cmp/navbar";
// import PanoramicImage from "./cmp/panoramicimage";
// import Portfoliointro from "./cmp/portfoliointro";
// import Project from "./cmp/project";
// import Contactform from "./cmp/contactform";
// import Footer from "./cmp/footer";
// import Logobanner from "./cmp/logobanner";
import Threejstest from "./cmp/3jstest";

function App() {
  return (
    <div className="main">
      {/* <Navbar />
      <div className="content">
        <PanoramicImage />
      </div> */}
      <Threejstest />
      {/* <div className="portfolio-intro">
        <Logobanner />
      </div>
      <div className="portfolio-section">
        <Portfoliointro />
      </div>
      <div className="project-section">
        <Project />
      </div>
      <div className="contact-section">
        <Contactform />
      </div>
      <div className="footer-section">
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
