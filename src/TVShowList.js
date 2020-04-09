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
            <a href={item.url}><h2>{item.name}</h2></a>
            Rated: {item.rating && item.rating.average}  ({item.genres && item.genres.join(",")})
            <p>{stripTags(item.summary)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

//remove tags by replacing the matched expression with an empty string.  
//This function uses a regular expression.  It is not important to learn these on the course.
function stripTags(str){
  //regex components: 
  // <
  // / (optional)
  // a sequence of at least one alphabet character (case insensitive)
  // >
  return str.replace(/<\/?([a-z])+>/gi, "");
}
export default TVShowList;
