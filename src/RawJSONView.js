import React, { useState } from "react";

import "./RawJSONView.css";

function RawJSONView(props) {
  const [visible, setVisible] = useState(false);

  return (
    <section>
      <header>
        <h1>
          Raw JSON View
          { /* buttons to change visibility of this json section */}
          <button onClick={() => setVisible(true)}>ON</button> |
          <button onClick={() => setVisible(false)}>OFF</button>
        </h1>
      </header>
      {visible ? (
        <div id="rawJSON">{JSON.stringify(props.json.shows, null, 2)}</div>
      ) : null}
    </section>
  );
}
export default RawJSONView;
