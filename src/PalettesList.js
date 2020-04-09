import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PalettesList.css";

function PalettesList(props) {
  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.tvmaze.com/shows"
      );
      setData({hits: result.data});
    };
    fetchData();
  }, []);

  
  return (
    <div className="PalettesList">
      <h2>Palettes List</h2>
      <ul>
        {data.hits.map(item => (
          <li key={item.id} class='show'>
            {item.id} - <a href={item.url}>{item.name}</a> Rated: {item.rating && item.rating.average}  ({item.genres && item.genres.join(",")})
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PalettesList;
