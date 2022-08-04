import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header({ setReset }) {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#E99E1D" }}>
        <Container>
          <Navbar.Brand href="#home">Hello soldier</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text onClick={() => setReset((prev) => !prev)}>
              <h5>Reset</h5>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <h1>Finding Falcone!</h1>
      </div>
    </div>
  );
}

export default Header;
