import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PalettesList.css";

function PalettesList(props) {
  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://www.colourlovers.com/api/palettes/top?format=json&numResults=20&jsonCallback="
      );
      setData({hits: result.data});
    };
    fetchData();
  }, []);

  
  console.log(typeof data);
  console.log(JSON.stringify(data, null, 2));
  
  return (
    <div className="PalettesList">
      <h2>Palettes List</h2>
      <ul>
        {data.hits.map(item => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PalettesList;
