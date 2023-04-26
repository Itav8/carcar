import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceForm from './ServiceForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="/services" element={<AppointmentList />} />
          <Route path="/services">
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="/services">
            <Route path="new" element={<ServiceForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
