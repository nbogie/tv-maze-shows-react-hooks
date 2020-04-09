import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
//import App from './App';


function PersonCard(props){
  return (<div className='person-card'><h1>{props.name}!</h1>
      <div className='card-section'>Address</div>
      <p>Stuff about {props.name}...</p>
      <div className='card-section'>Employment</div>
      <p>More stuff about {props.name}...</p>
    </div>);
}


const child = (
  <div>
    Hello, world!
    <Example/>
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

const parentElem = document.getElementById('root');

ReactDOM.render(child, parentElem);
