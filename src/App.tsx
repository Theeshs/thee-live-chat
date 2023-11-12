import React from 'react';
import './App.css';
import Routes from "./utils/Routes";
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
