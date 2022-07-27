import React, { useEffect, useState } from "react";
import DropDown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import "./Dropdown.css";

function Dropdown() {
  const [planet, setPlanet] = useState([]);
  const [destination, setDestination] = useState({
    destination1: "",
    destination2: "",
    destination3: "",
    destination4: "",
  });
  const [selectedPlanet, setSelectedPlanet] = useState("");
  useEffect(() => {
    axios
      .get("https://findfalcone.herokuapp.com/planets")
      .then((res) => {
        console.log(res.data);
        setPlanet(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(planet);

  const handleDropdown = (e, dest_name) => {
    console.log(e);
    Object.keys(destination).map((dest) => {
      return dest === dest_name
        ? setDestination({ ...destination, [dest_name]: e })
        : "";
    });
  };

  return (
    <div>
      <div className="dropdown">
        <div className="destination1">
          <DropdownButton
            id="dropdown-basic-button"
            title={destination?.destination1 || "Select Destination"}
            onSelect={(e) => handleDropdown(e, "destination1")}
          >
            {planet
              ?.filter((item) => {
                return (
                  item.name !== destination.destination2 &&
                  item.name !== destination.destination3 &&
                  item.name !== destination.destination4
                );
              })
              .map((item) => {
                return (
                  <>
                    <DropDown.Item eventKey={item.name}>
                      {item.name}
                    </DropDown.Item>
                  </>
                );
              })}
          </DropdownButton>
        </div>
        <div className="destination2">
          <DropdownButton
            id="dropdown-basic-button"
            title={destination?.destination2 || "Select Destination"}
            onSelect={(e) => handleDropdown(e, "destination2")}
          >
            {planet
              ?.filter((item) => {
                return (
                  item.name !== destination.destination1 &&
                  item.name !== destination.destination3 &&
                  item.name !== destination.destination4
                );
              })
              .map((item) => {
                return (
                  <>
                    <DropDown.Item eventKey={item.name}>
                      {item.name}
                    </DropDown.Item>
                  </>
                );
              })}
          </DropdownButton>
        </div>
        <div className="destination3">
          <DropdownButton
            id="dropdown-basic-button"
            title={destination?.destination3 || "Select Destination"}
            onSelect={(e) => handleDropdown(e, "destination3")}
          >
            {planet
              ?.filter((item) => {
                return (
                  item.name !== destination.destination1 &&
                  item.name !== destination.destination2 &&
                  item.name !== destination.destination4
                );
              })
              .map((item) => {
                return (
                  <>
                    <DropDown.Item eventKey={item.name}>
                      {item.name}
                    </DropDown.Item>
                  </>
                );
              })}
          </DropdownButton>
        </div>
        <div className="destination4">
          <DropdownButton
            id="dropdown-basic-button"
            title={destination?.destination4 || "Select Destination"}
            onSelect={(e) => handleDropdown(e, "destination4")}
          >
            {planet
              ?.filter((item) => {
                return (
                  item.name !== destination.destination1 &&
                  item.name !== destination.destination2 &&
                  item.name !== destination.destination3
                );
              })
              .map((item) => {
                return (
                  <>
                    <DropDown.Item eventKey={item.name}>
                      {item.name}
                    </DropDown.Item>
                  </>
                );
              })}
          </DropdownButton>
        </div>
      </div>

      {Object.keys(destination).map((dname, index) => {
        return (
          <>
            <div className="destination4">
              <DropdownButton
                id="dropdown-basic-button"
                title={destination[dname] || "Select Destination"}
                onSelect={(e) => handleDropdown(e, dname)}
              >
                {planet
                  ?.filter((item) => {
                    return Object.keys("destination").map((x) => {
                      return x !== item.name
                        ? item.name !== destination.destination1 &&
                            item.name !== destination.destination2 &&
                            item.name !== destination.destination3
                        : "";
                    });
                  })
                  .map((item) => {
                    return (
                      <>
                        <DropDown.Item eventKey={item.name}>
                          {item.name}
                        </DropDown.Item>
                      </>
                    );
                  })}
              </DropdownButton>
            </div>
            ;
          </>
        );
      })}
    </div>
  );
}

export default Dropdown;
