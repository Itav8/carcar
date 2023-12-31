import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import SalespersonForm from "./SalespersonForm";
import SalespeopleList from "./SalespeopleList";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import SalesForm from "./SalesForm";
import SalesList from "./SalesList";
import SalespersonHistory from "./SalespersonHistory";
import TechnicianList from "./TechnicianList";
import ServiceForm from "./ServiceForm";
import AppointmentList from "./AppointmentList";
import ServiceHistory from "./ServiceHistory";
import VehicleModelForm from "./VehicleModelForm";
import VehicleModelList from "./VehicleModelList";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import AutomobileForm from "./AutomobileForm";
import AutomobileList from "./AutomobileList";

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
          <Route path="/automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="/salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          <Route path="/customer">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="/sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
          <Route path="/services" element={<AppointmentList />} />
          <Route path="/services">
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="/services">
            <Route path="new" element={<ServiceForm />} />
          </Route>
          <Route path="/models">
            <Route index element={<VehicleModelList />} />
            <Route path="new" element={<VehicleModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
