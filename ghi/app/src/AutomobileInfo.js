import React, { useEffect, useState } from "react";

function AutomobileInfo(props) {
  const [automobile, setAutomobile] = useState({});
  console.log("PROPS", props.automobile);


  useEffect(() => {
    const fetchAutomobileInfo = async () => {
      const automobileInfo = await fetch(
        `http://localhost:8100/api/automobiles/${props.automobile.vin}/`
      );

      if (automobileInfo.ok) {
        const data = await automobileInfo.json();
        console.log("DATA", data);
        setAutomobile(data);
      }
    };
    fetchAutomobileInfo();
  }, []);

  return (
    <div>
      <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKF7un7rdumxHU9gmGv_eQFCx4ct0cPjtttw&usqp=CAU" />
      <div>
        {/* <h5>{automobile.model.manufacturer.name}</h5> */}
        {/* <p>{automobile.model.name}</p> */}
        <p>{automobile.vin}</p>
        <p>{automobile.year}</p>
        <p>{automobile.color}</p>
        {/* <p>{automobile.sold}</p> */}
      </div>
    </div>
  );
}

export default AutomobileInfo;
