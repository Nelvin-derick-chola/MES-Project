import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
//import { BookShipment } from './pages/BookShipment/BookShipment';
import { TrackShipment } from './pages/TrackShipment/TrackShipment';
import { Admin } from './pages/Admin/Admin';
import { AdminLogin } from './pages/Admin/AdminLogin';
import './App.css';
import { usePageTitle } from './hooks/usePageTitle';

import { PageManager } from './pages/Admin/PageManager/PageManager';


// Layout wrapper component
const Layout = ({ children }: { children: React.ReactNode }) => {
  usePageTitle();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');


  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/restricted" element={<Restricted />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/indemnity" element={<Indemnity />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/track-shipment" element={<TrackShipment />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

          // Add route
          <Route path="/admin/pages" element={<PageManager />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;