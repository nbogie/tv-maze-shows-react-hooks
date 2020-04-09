import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TVShowList.css";

function TVShowList(props) {
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
    <div className="TVShowList">
      <h2>TV Show List</h2>
      <ul>
        {data.hits.map(item => (
          <li key={item.id} className='show'>
            <h2>{item.id}</h2> - <a href={item.url}>{item.name}</a> Rated: {item.rating && item.rating.average}  ({item.genres && item.genres.join(",")})
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TVShowList;
