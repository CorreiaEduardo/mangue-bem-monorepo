import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MushroomList from "./components/MushroomList";
import SearchBar from "./components/Search";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <MushroomList />
    </div>
  );
}

export default App;
