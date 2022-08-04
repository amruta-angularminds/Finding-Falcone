import { Button } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";

function FinalResult({ finalResultObj, time }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <div>
        {finalResultObj?.status === "success" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <BsFillCheckCircleFill
              style={{ height: "100px", width: "100px", color: "green" }}
            />
            <h4>
              Success! Congratulations on finding falcone. King shah is mighty
              pleased.
            </h4>
            <h5>Time Taken: {time}</h5>
            <h5>Planet Found: {finalResultObj.planet_name}</h5>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <RiErrorWarningLine
              style={{ height: "100px", width: "100px", color: "red" }}
            />
            <h4> Sorry! No falcone found.</h4>
          </div>
        )}
      </div>
      <div className="sub-btn">
        <Link to="/home">
          <Button className="btn btn-secodary">Start Again</Button>
        </Link>
      </div>
    </div>
  );
}

export default FinalResult;
