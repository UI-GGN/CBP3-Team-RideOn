import React from "react";
import "./App.css";
import {Button} from "@mui/material";

function App() {
  const a = "#@4567";
  return (
    <div className="App">
      <Button variant="contained" color="primary">
        ${a}
      </Button>
      <header className="App-header">
        <h2>Welcome to RideOn!</h2>
      </header>
    </div>
  );
}

export default App;
