import React from "react";
import TVShowList from "./TVShowList";
import StateExample from "./StateExample";

import "./App.css";

const App = (
  <div id="app">
    <header><h1>TV Shows data from TV Maze</h1></header>
    <div id="container">
      <TVShowList />
      <StateExample />
    </div>
  </div>
);

export default App;
