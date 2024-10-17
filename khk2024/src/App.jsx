import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/" element={<Warning />} /> */}
          {/* <Route path="/reservation" element={<Reservation />} /> */}
          <Route
            path="*"
            element={
              <div>
                <h2>error 404</h2>
              </div>
            }
          />
          {/* <Route path="reserve" element={<ResPag />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
