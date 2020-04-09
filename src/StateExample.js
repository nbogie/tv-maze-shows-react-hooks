import React, { useState } from "react";

function StateExample() {
  // Declare a new state variable, which we'll call "count"
  // and a function to change it
  const [count, setCount] = useState(0);

  return (
    <div style={{width: "50%", margin: "0 auto"}}>
      <p>
        State Example: You clicked {count} times
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </p>
    </div>
  );
}

export default StateExample;
