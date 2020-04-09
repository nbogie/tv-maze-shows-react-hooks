import React, { useState } from "react";

function StateExample() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={border: "1px solid black"}>
      <p>
        State Example: You clicked {count} times
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </p>
    </div>
  );
}

export default StateExample;
