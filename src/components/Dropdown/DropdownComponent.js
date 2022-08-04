import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dropdown.css";
import Vehicle from "../Vehicles/Vehicle";
import { Button } from "react-bootstrap";

function DropdownComponent({ setFinalResultObj, setTime, reset }) {
  const baseURL = "https://findfalcone.herokuapp.com";
  const navigate = useNavigate();
  const [planet, setPlanet] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [originalVehicle, setOriginalVehicle] = useState([]);
  const [token, setToken] = useState("");
  const commonObj = {
    destination1: "",
    destination2: "",
    destination3: "",
    destination4: "",
  };
  const [destination, setDestination] = useState(commonObj);
  const [selectDestination, setSelectDestination] = useState(commonObj);

  const [timeTaken, setTimeTaken] = useState({
    destination1: 0,
    destination2: 0,
    destination3: 0,
    destination4: 0,
  });
  useEffect(() => {
    setDestination(commonObj);
    setSelectDestination(commonObj);
  }, [reset]);

  // Concurrent api calls to set planets,vehicles and token
  useEffect(() => {
    axios
      .all([
        axios.get(`${baseURL}/planets`),
        axios.get(`${baseURL}//vehicles`),
        axios.post(
          `${baseURL}/token`,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          }
        ),
      ])
      .then(
        axios.spread((planetRes, vehicleRes, tokenRes) => {
          setPlanet(planetRes.data);
          setVehicleData(vehicleRes.data);
          setOriginalVehicle(vehicleRes.data);
          setToken(tokenRes.data.token);
        })
      )
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // sets four selected destinations
  const handleDropdown = (e, dest_name) => {
    Object.keys(destination).map((dest) => {
      return dest === dest_name
        ? setDestination({ ...destination, [dest_name]: e })
        : "";
    });
  };

  // calculating time taken for reach every destination
  const calculateTime = (index, t) => {
    setTimeTaken({ ...timeTaken, [`destination${index + 1}`]: t });
  };
  const handleSubmit = () => {
    const finalDestination = {
      token: token,
      planet_names: Object.values(destination),
      vehicle_names: Object.values(selectDestination),
    };
    axios
      .post(`${baseURL}/find`, finalDestination, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setFinalResultObj(res.data);
        setTime(Object.values(timeTaken).reduce((a, b) => a + b));
        navigate("/final");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <div className="container-main">
        <div className="dropdown">
          {Object.keys(destination).map((dname, index) => {
            return (
              <>
                <div key={index}>
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
                        distance={planet.find((each) =>
                          each.name === destination[dname] ? each.distance : ""
                        )}
                        destination_no={index}
                        vehicleData={vehicleData}
                        setVehicleData={setVehicleData}
                        selectDestination={selectDestination}
                        setSelectDestination={setSelectDestination}
                        originalVehicle={originalVehicle}
                        calculateTime={calculateTime}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            );
          })}
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
            Time Taken : {Object.values(timeTaken).reduce((a, b) => a + b)}
          </div>
        </div>
      </div>

      <div className="sub-btn">
        <Button
          disabled={
            Object.values(selectDestination).filter((each) => each === "")
              .length > 0
          }
          onClick={handleSubmit}
        >
          Find Falcone!
        </Button>
      </div>
    </div>
  );
}

export default DropdownComponent;
