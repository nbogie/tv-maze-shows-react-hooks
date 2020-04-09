import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TVShowList.css";
import FakeData from "./tvmaze_shows.json";
import RawJSONView from "./RawJSONView";
const isLive = false;

function sortByRating(shows) {
  shows.sort((a, b) => b.rating.average - a.rating.average);
  return shows;
}
function showMatchesQuery(show, query) {
  return (
    -1 !== show.name.toLowerCase().indexOf(query) ||
    -1 !== show.summary.toLowerCase().indexOf(query)
  );
}
function TVShowList(props) {
  //HOOKS: 
  //STATE HOOK: fetched data
  const [data, setData] = useState({ shows: [] });
  //STATE HOOK: filtered shows (filtered from data)
  const [filteredShows, setFilteredShows] = useState([]);
  //STATE HOOK: query from text input box
  const [query, setQuery] = useState("mystery");

  //EFFECT HOOK: fetch data from API
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
      setData({ shows: sortByRating(FakeData).slice(0, 100) });
    }
  }, []); //Note: IMPORTANT don't forget [] as last param so that useEffect does not execute on any state change
  //(INCLUDING the one it causes)

  
  //EFFECT HOOK: 
  //updates filteredShows by filtering data with query,
  //runs whenever the query is changed (each keystroke)
  //or indeed when the data itself is changed (fetched new data)
  useEffect(() => {
    //may run before a fetch has ever set data,
    //but it's ok because we init data to {shows:[]}
    setFilteredShows(data.shows.filter(show => showMatchesQuery(show, query)));
  }, [query, data]);

  
  return (
    <div className="TVShowList">
      <input
        id="searchInput"
        type="text"
        placeholder="search for a show"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <span id='queryEcho'>{query}</span>
      <span id='filterSummary'>Filtered data: {filteredShows.length}</span>
      <ul>
        {filteredShows.map(item => (
          <li key={item.id} className="show">
            <a href={item.url}>
              <h1>{item.name}</h1>
            </a>
            <div className="three-panels">
              <figure className="panel panel-one">
                <img src={item.image.medium} alt="{item.name}" />
              </figure>
              <div className="panel panel-two">{stripTags(item.summary)}</div>
              <div className="panel panel-three">
                <p>
                  <span className="info-key">Rated:</span>{" "}
                  {item.rating && item.rating.average}
                </p>
                <p>
                  <span className="info-key">Genres: </span>
                  {item.genres && item.genres.join(" | ")}
                </p>
                <p>
                  <span className="info-key">Status:</span> {item.status}
                </p>
                <p>
                  <span className="info-key">Runtime:</span> {item.runtime}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <RawJSONView json={filteredShows}></RawJSONView>
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
