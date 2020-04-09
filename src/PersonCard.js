import React from "react";

import "./PersonCard.css";

function PersonCard(props){
  return (<div className='person-card'><h1>{props.name}!</h1>
      <div className='card-section'>Address</div>
      <p>Stuff about {props.name}...</p>
      <div className='card-section'>Employment</div>
      <p>More stuff about {props.name}...</p>
    </div>);
}

export default PersonCard;
