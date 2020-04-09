import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PalettesList.css";



function PalettesList(props) {
  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://anapioficeandfire.com/api/characters/"
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
            <a href={item.url}>{item.aliases[0]} ({item.culture})</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PalettesList;
