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
  originalVehicle,
  distance,
  calculateTime,
  timeTaken,
}) {
  const [qtyFlag, setQtyFlag] = useState(false);

  const handleChange = (e) => {
    setSelectDestination({
      ...selectDestination,
      ["destination" + (destination_no + 1)]: e.target.value,
    });
    setQtyFlag(!qtyFlag);
    let selected = originalVehicle.filter((each) => {
      return each.name == e.target.value;
    });
    calculateTime(destination_no, selected[0].max_distance / selected[0].speed);
  };

  useEffect(() => {
    let timeValue = 0;
    let dataV = originalVehicle;
    const name = Object.values(selectDestination);
    name.forEach((vec) => {
      dataV = dataV.map((each) => {
        if (vec === each.name) {
          return { ...each, total_no: each.total_no - 1 };
        } else {
          return { ...each };
        }
      });
    });
    setVehicleData(dataV);
  }, [selectDestination]);

  return (
    <div className="vehicle">
      <Form style={{ marginTop: "20px" }}>
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
                  disabled={
                    !vehicle.total_no ||
                    distance.distance > vehicle.max_distance
                  }
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
