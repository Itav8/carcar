import React, { useEffect, useState } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const handleDelete = async (customerId) => {
    const url = `http://localhost:8090/api/customers/${customerId}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setCustomers(customers.filter(customer => customer.id !== customerId))
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerList = await fetch("http://localhost:8090/api/customers/");

      if (customerList.ok) {
        const data = await customerList.json();
        setCustomers(data.customers);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <>
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, i) => {
            return (
              <tr key={i}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
                <td>
                  <button className="btn btn-outline-dark" onClick={() => handleDelete(customer.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
