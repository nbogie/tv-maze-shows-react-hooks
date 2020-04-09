import React, { Component, useState } from "react";
import TVShowList from "./TVShowList";
import PersonCard from "./PersonCard";
import StateExample from "./StateExample";

import "./App.css";

const App = (
  <div id="app">
    <header><h1>This is the header</h1></header>
    <div id="container">
      <StateExample />
      <TVShowList />
      <PersonCard name="Alice"></PersonCard>
      <PersonCard name="Bob"></PersonCard>
      <PersonCard name="Craig"></PersonCard>
      <PersonCard name="Dan"></PersonCard>
      <PersonCard name="Eve"></PersonCard>
    </div>
  </div>
);

export default App;
