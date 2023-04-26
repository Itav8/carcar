import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import SalespersonForm from "./SalespersonForm";
import SalespeopleList from "./SalespeopleList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="/salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
