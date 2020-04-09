import React, { Component, useState} from 'react';
import TVShowList from './TVShowList';
import PersonCard from './PersonCard';
import StateExample from './StateExample';

import './App.css';



const App = (
  <div>
    <StateExample/>
    <TVShowList/>
    <PersonCard name='Alice'></PersonCard>
    <PersonCard name='Bob'></PersonCard>
    <PersonCard name='Craig'></PersonCard>
    <PersonCard name='Dan'></PersonCard>
    <PersonCard name='Eve'></PersonCard>
  </div>);


export default App;

