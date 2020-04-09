import React, { Component, useState} from 'react';
import TVShowList from './TVShowList';
import './App.css';



const App = (
  <div>
    Hello, world!
    <Example/>
    <TVShowList/>
    <PersonCard name='Alice'></PersonCard>
    <PersonCard name='Bob'></PersonCard>
    <PersonCard name='Craig'></PersonCard>
    <PersonCard name='Dan'></PersonCard>
    <PersonCard name='Eve'></PersonCard>
  </div>);





function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;

