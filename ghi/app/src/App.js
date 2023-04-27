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
import VehicleModeForm from "./VehicleModelForm";
import VehicleModelList from "./VehicleModelList";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";

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
          <Route path="/salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
          <Route path="/customer">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="/sales">
            <Route index element={<SalesList />} />
            <Route path="create" element={<SalesForm />} />
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
            <Route path="create" element={<VehicleModeForm />} />
          </Route>
          <Route path="/automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
