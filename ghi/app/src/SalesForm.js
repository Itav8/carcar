import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SalesForm() {
  const navigate = useNavigate();
  const [vins, setVins] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    automobileVin: "",
    salesperson: "",
    customer: "",
    price: null,
  });

  useEffect(() => {
    const fetchVinData = async () => {
      const url = "http://localhost:8100/api/automobiles/";
      const response = await fetch(url);

      if (response.ok) {
        const vinData = await response.json();
        setVins(vinData.autos);
      }
    };

    const fetchSalespersonData = async () => {
      const url = "http://localhost:8090/api/salespeople/";
      const response = await fetch(url);

      if (response.ok) {
        const salespersonData = await response.json();
        setSalespeople(salespersonData.salespeople);
      }
    };

    const fetchCustomerData = async () => {
      const url = "http://localhost:8090/api/customers/";
      const response = await fetch(url);

      if (response.ok) {
        const customerData = await response.json();
        setCustomers(customerData.customers);
      }
    };

    fetchVinData();
    fetchSalespersonData();
    fetchCustomerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/sales/";
    const data = {
      automobile: formData.automobileVin,
      salesperson: formData.salesperson,
      customer: formData.customer,
      price: formData.price,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        automobileVin: "",
        salesperson: "",
        customer: "",
        price: "",
      });
      return navigate("/sales");
    } else {
      const formAlert = document.getElementById("priceAlert");
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>Problem with form, try again.</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
      ].join('')

      formAlert.append(wrapper);

  }

  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="automobileVin"
                id="automobileVin"
                className="form-select"
              >
                <option value="">Choose an automobile VIN...</option>
                {vins.map((vin, i) => {
                  return (
                    <option key={i} value={vin.vin}>
                      {vin.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="">Choose an salesperson...</option>
                {salespeople.map((salesperson, i) => {
                  return (
                    <option key={i} value={salesperson.employee_id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose an customer...</option>
                {customers.map((customer, i) => {
                  return (
                    <option key={i} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div id="priceAlert" className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="price"
                required
                type="text"
                name="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
