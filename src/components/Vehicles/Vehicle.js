import React, { useState, useEffect } from "react";
import "./Vehicle.css";
import Form from "react-bootstrap/Form";
function Vehicle({
  destination,
  destination_no,
  vehicleData,
  selectDestination,
  setSelectDestination,
  setVehicleData,
}) {
  const [qtyFlag, setQtyFlag] = useState(false);
  // const [vehicles, setVehicles] = useState(vehicleData);
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(destination_no);
    setSelectDestination({
      ...selectDestination,
      [destination_no]: e.target.value,
    });
    setQtyFlag(!qtyFlag);
  };
  useEffect(() => {
    console.log("in effect");
    if (qtyFlag) {
      vehicleData?.map((data) => {
        return Object.keys(selectDestination).map((dest) => {
          return selectDestination[dest] === data.name
            ? setVehicleData((prev) =>
                prev.map((vehicle) =>
                  vehicle.name === selectDestination[dest]
                    ? { ...vehicle, total_no: vehicle.total_no - 1 }
                    : vehicle
                )
              )
            : "";
        });
      });
    }
  }, [selectDestination]);

  console.log(vehicleData);
  console.log(selectDestination);
  return (
    <div className="vehicle">
      <Form>
        {vehicleData?.map((vehicle, index) => {
          return (
            <>
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  label={`${vehicle.name} (${vehicle.total_no})`}
                  name="group1"
                  type="radio"
                  value={vehicle.name}
                  onChange={handleChange}
                  disabled={vehicle.total_no <= 0 && index !== destination_no}
                />
              </div>
            </>
          );
        })}
      </Form>
    </div>
  );
}

export default Vehicle;
