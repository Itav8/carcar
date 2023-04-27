import { NavLink } from "react-router-dom";
import carcar from './carcar.svg'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        <img src={carcar} alt="" width="30" height="24" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-wrap">
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/manufacturers/new">
                Create Manufacturer
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/manufacturers">
                List Manufacturers
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/automobiles/new">
                Create Automobile
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/technicians/new">
                Create Technician
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/salespeople">
                Salespeople
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/salespeople/create">
                Add a Salesperson
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/customer">
                Customers
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/customer/create">
                Add a Customer
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/sales">
                Sales
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/sales/create">
                Add a Sale
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/sales/history">
                Salesperson History
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/technicians">
                List Technicians
              </NavLink>
            </li>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/services/new">
                Create a Service Appointment
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/services">
                List Appointments
              </NavLink>
            </li>
            </div>
            <div>
            <li className="nav-item col">
              <NavLink className="nav-link" to="/services/history">
                Service History
              </NavLink>
            </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
