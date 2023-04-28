import React, { useEffect, useState } from "react";
import Alert from './Alert';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async (salesId) => {
    const url = `http://localhost:8090/api/sales/${salesId}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setAlert(true);
      setAlertMessage("Successfully Deleted!");
      setSales(sales.filter((sale) => sale.id !== salesId));
    } else {
      setAlert(true);
      setAlertMessage("Problem with delete, try again later.");}
  };

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchSales = async () => {
      const salesList = await fetch("http://localhost:8090/api/sales/");

      if (salesList.ok) {
        const data = await salesList.json();
        setSales(data.sales);
      }
    };

    fetchSales();
  }, []);


  return (
    <>
      <h1>Sales</h1>
        <Alert
            alert={alert}
            message={alertMessage}
        >
            <></>
        </Alert>
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => {
            const salespersonName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
            const customerName = `${sale.customer.first_name} ${sale.customer.last_name}`;
            return (
              <tr key={i}>
                <td>{sale.salesperson.employee_id}</td>
                <td>{salespersonName}</td>
                <td>{customerName}</td>
                <td>{sale.automobile.vin}</td>
                <td>{priceFormatter.format(sale.price)}</td>
                <td>
                  <button className="btn btn-outline-dark" onClick={() => handleDelete(sale.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default SalesList;
