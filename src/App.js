import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import DropdownComponent from "./components/Dropdown/DropdownComponent";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FinalResult from "./components/FinalResult";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="home"/>} />
          <Route path="/home" element={<DropdownComponent />} />
          <Route path="/final" element={<FinalResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
