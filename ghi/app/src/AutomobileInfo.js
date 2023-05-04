import React, { useEffect, useState } from "react";

function AutomobileInfo(props) {
  const [automobile, setAutomobile] = useState({});

  useEffect(() => {
    const fetchAutomobileInfo = async () => {
      const automobileInfo = await fetch(
        `http://localhost:8100/api/automobiles/${props.automobile.vin}/`
      );

      if (automobileInfo.ok) {
        const data = await automobileInfo.json();
        setAutomobile(data);
      }
    };

    fetchAutomobileInfo();
  }, []);

  let isSold = automobile.sold;
  if (isSold) {
    isSold = "Yes";
  } else {
    isSold = "No";
  }

  return (
    <div>
      <img
        className="card-img-top"
        src={
          automobile.model.picture_url ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKF7un7rdumxHU9gmGv_eQFCx4ct0cPjtttw&usqp=CAU"
        }
      />
      <div>
        <p className="text-start">
          <strong>VIN: </strong>
          {automobile.vin}
        </p>
        <p className="text-start">
          <strong>Manufacturer:</strong>
          {automobile?.model?.manufacturer?.name}
        </p>
        <p className="text-start">
          <strong>Model: </strong>
          {automobile?.model?.name}
        </p>
        <p className="text-start">
          <strong>Year: </strong>
          {automobile.year}
        </p>
        <p className="text-start">
          <strong>Color: </strong>
          {automobile.color}
        </p>
        <p className="text-start">
          <strong>Sold: </strong>
          {isSold}
        </p>
      </div>
    </div>
  );
}

export default AutomobileInfo;
