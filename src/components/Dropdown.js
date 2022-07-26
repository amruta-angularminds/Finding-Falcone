import React, { useEffect, useState } from "react";
import axios from "axios";
function Dropdown() {
  const [planet, setPlanet] = useState([]);
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
  return <div>dropdown menu</div>;
}

export default Dropdown;
