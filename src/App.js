import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import DropdownComponent from "./components/Dropdown/DropdownComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FinalResult from "./components/FinalResult";

function App() {
  const [finalResultObj, setFinalResultObj] = useState();
  const [time, setTime] = useState();
  const [reset, setReset] = useState();
  return (
    <div className="App">
      <Router>
        <Header setReset={setReset} />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route
            path="/home"
            element={
              <DropdownComponent
                setFinalResultObj={setFinalResultObj}
                setTime={setTime}
                reset={reset}
              />
            }
          />
          <Route
            path="/final"
            element={
              <FinalResult finalResultObj={finalResultObj} time={time} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
