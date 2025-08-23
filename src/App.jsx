import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Whatsupp from "./components/WhatsappButtons.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="body d-flex flex-column">
        <div>
          <Navbar />
        </div>
        <div className="App  d-flex flex-column">
          <AppRoutes />
        </div>
        
        <Footer />
        <Whatsupp/>
      </div>
     
    </BrowserRouter>
  );
};

export default App;

