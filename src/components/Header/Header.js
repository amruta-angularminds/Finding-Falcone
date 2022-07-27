import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#E99E1D" }}>
        <Container>
          <Navbar.Brand href="#home">Hello kkuiouio soldier</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Reset</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <h1>Finding Falconhfgnhgjhytuikiyukjhm nbm,jhe</h1>
        <h5>njksjdsjlfgjl</h5>
        <h1>kfjhhgdfgjkll';</h1>
      </div>
    </div>
  );
}

export default Header;
