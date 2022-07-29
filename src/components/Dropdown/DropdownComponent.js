import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import "./Dropdown.css";
import Vehicle from "../Vehicles/Vehicle";
import { Col, Row } from "react-bootstrap";

function DropdownComponent() {
  const [planet, setPlanet] = useState([]);

  const [vehicleData, setVehicleData] = useState([]);
  const [destination, setDestination] = useState({
    destination1: "",
    destination2: "",
    destination3: "",
    destination4: "",
  });
  const [selectDestination, setSelectDestination] = useState({});

  useEffect(() => {
    axios
      .get("https://findfalcone.herokuapp.com/planets")
      .then((res) => {
        // console.log(res.data);
        setPlanet(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://findfalcone.herokuapp.com/vehicles")
      .then((res) => {
        // console.log(res.data);
        setVehicleData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(planet);
  // console.log(vehicleData);
  const handleDropdown = (e, dest_name) => {
    // console.log(e);
    Object.keys(destination).map((dest) => {
      return dest === dest_name
        ? setDestination({ ...destination, [dest_name]: e })
        : "";
    });
  };

  // console.log(destination);
  return (
    <div>
      <div className="dropdown">
        {Object.keys(destination).map((dname, index) => {
          return (
            <>
              <div>
                <label className="label">Destination{index + 1}</label>
                <Dropdown onSelect={(e) => handleDropdown(e, dname)}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {destination[dname] || "Select Destination"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {planet
                      ?.filter((item) => {
                        return (
                          item.name !== destination.destination1 &&
                          item.name !== destination.destination2 &&
                          item.name !== destination.destination3 &&
                          item.name !== destination.destination4
                        );
                      })
                      .map((item) => {
                        return (
                          <>
                            <Dropdown.Item eventKey={item.name}>
                              {item.name}
                            </Dropdown.Item>
                          </>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
                {destination[dname] !== "" ? (
                  <>
                    <Vehicle
                      destination={destination}
                      destination_no={index}
                      vehicleData={vehicleData}
                      selectDestination={selectDestination}
                      setSelectDestination={setSelectDestination}
                      setVehicleData={setVehicleData}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default DropdownComponent;

// <div className="dropdown">
// <div className="destination1">
//   <DropdownButton
//     id="dropdown-basic-button"
//     title={destination?.destination1 || "Select Destination"}
//     onSelect={(e) => handleDropdown(e, "destination1")}
//   >
//     {planet
//       ?.filter((item) => {
//         return (
//           item.name !== destination.destination2 &&
//           item.name !== destination.destination3 &&
//           item.name !== destination.destination4
//         );
//       })
//       .map((item) => {
//         return (
//           <>
//             <DropDown.Item eventKey={item.name}>
//               {item.name}
//             </DropDown.Item>
//           </>
//         );
//       })}
//   </DropdownButton>
// </div>
// <div className="destination2">
//   <DropdownButton
//     id="dropdown-basic-button"
//     title={destination?.destination2 || "Select Destination"}
//     onSelect={(e) => handleDropdown(e, "destination2")}
//   >
//     {planet
//       ?.filter((item) => {
//         return (
//           item.name !== destination.destination1 &&
//           item.name !== destination.destination3 &&
//           item.name !== destination.destination4
//         );
//       })
//       .map((item) => {
//         return (
//           <>
//             <DropDown.Item eventKey={item.name}>
//               {item.name}
//             </DropDown.Item>
//           </>
//         );
//       })}
//   </DropdownButton>
// </div>
// <div className="destination3">
//   <DropdownButton
//     id="dropdown-basic-button"
//     title={destination?.destination3 || "Select Destination"}
//     onSelect={(e) => handleDropdown(e, "destination3")}
//   >
//     {planet
//       ?.filter((item) => {
//         return (
//           item.name !== destination.destination1 &&
//           item.name !== destination.destination2 &&
//           item.name !== destination.destination4
//         );
//       })
//       .map((item) => {
//         return (
//           <>
//             <DropDown.Item eventKey={item.name}>
//               {item.name}
//             </DropDown.Item>
//           </>
//         );
//       })}
//   </DropdownButton>
// </div>
// <div className="destination4">
//   <DropdownButton
//     id="dropdown-basic-button"
//     title={destination?.destination4 || "Select Destination"}
//     onSelect={(e) => handleDropdown(e, "destination4")}
//   >
//     {planet
//       ?.filter((item) => {
//         return (
//           item.name !== destination.destination1 &&
//           item.name !== destination.destination2 &&
//           item.name !== destination.destination3
//         );
//       })
//       .map((item) => {
//         return (
//           <>
//             <DropDown.Item eventKey={item.name}>
//               {item.name}
//             </DropDown.Item>
//           </>
//         );
//       })}
//   </DropdownButton>
// </div>
// </div>
