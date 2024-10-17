import React, { useState, useEffect } from "react";
//import "./App.css";

function HomeComponent() {
  const [message, setMessage] = useState("");
  const [kokos, setKokos] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message),
        setKokos(data.kokos);
      });
  }, []);

  return (
    <div className="App">
      <h1>
        {message} <br /> {kokos}
      </h1>
    </div>
  );
}

export default HomeComponent;
