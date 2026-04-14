//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { ContactPage } from './pages/Contact/Contact';
import { Team } from './pages/Team/Team';
import { Services } from './pages/Services/Services';
import { Privacy } from './pages/Privacy/Privacy';
import { Restricted } from './pages/Restricted/Restricted';
import { Insurance } from './pages/Insurance/Insurance';
import { Indemnity } from './pages/Indemnity/Indemnity';
import { StoreLocator } from './pages/StoreLocator/StoreLocator';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/team" element={<Team />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/restricted" element={<Restricted />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/indemnity" element={<Indemnity />} />
        <Route path="/store-locator" element={<StoreLocator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
