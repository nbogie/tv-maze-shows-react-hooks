import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TVShowList.css";
import FakeData from "./tvmaze_shows.json";

const isLive = false;
const showJSON = true;

function sortByRating(shows) {
  shows.sort((a, b) => b.rating.average - a.rating.average);
  return shows;
}
function TVShowList(props) {
  const [data, setData] = useState({ shows: [] });
  useEffect(() => {
    if (isLive) {
      console.log("fetching data...");
      const fetchData = async () => {
        const result = await axios("https://api.tvmaze.com/shows");
        setData({ shows: result.data });
      };
      fetchData();
    } else {
      console.log("using static fake data");
      setData({ shows: sortByRating(FakeData).slice(0, 20) });
    }
  }, []);

  return (
    <div className="TVShowList">
      <h2>TV Show List</h2>
      <ul>
        {data.shows.map(item => (
          <li key={item.id} className="show">
            <a href={item.url}>
              <h1>{item.name}</h1>
            </a>
            <div className="three-panels">
              <figure className="panel panel-one">
                <img src={item.image.medium} />
              </figure>
              <div className="panel panel-two">{stripTags(item.summary)}</div>
              <div className="panel panel-three">
                <p><span class='info-key'>Rated:</span> {item.rating && item.rating.average}</p>
                <p><span class='info-key'>Genres: </span>{item.genres && item.genres.join(" | ")}</p>
                <p><span class='info-key'>Status:</span> {item.status }</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        {showJSON ? (
          <pre id="rawJSON">{JSON.stringify(data.shows, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
}

//remove tags by replacing the matched expression with an empty string.
//This function uses a regular expression.  It is not important to learn these on the course.
function stripTags(str) {
  //regex components:
  // <
  // / (optional)
  // a sequence of at least one alphabet character (case insensitive)
  // >
  return str.replace(/<\/?([a-z])+>/gi, "");
}
export default TVShowList;
