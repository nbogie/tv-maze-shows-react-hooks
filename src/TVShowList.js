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

function matches(inspectStr, targetStr) {
  return -1 !== inspectStr.toLowerCase().indexOf(targetStr.toLowerCase());
}

function tvShowMatchesQuery(show, query) {
  return (
    matches(show.name, query) ||
    show.genres.some(genre => matches(genre, query))
    //|| matches(show.summary, query)
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
  //STATE HOOK: isLoading
  const [loading, setLoading] = useState(false);

  //EFFECT HOOK: fetch data from API
  useEffect(() => {
    if (isLive) {
      console.log("fetching data...");
      setLoading(true);
      const fetchData = async () => {
        const result = await axios("https://api.tvmaze.com/shows");
        await (new Promise((a, b) => setTimeout(() => a(), 3000)));
        setData({ shows: result.data });
        setLoading(false);

      };
      fetchData();
    } else {
      setLoading(true);
      console.log("using static fake data");
      setData({ shows: sortByRating(FakeData).slice(0, 100) });
      setLoading(false);
      
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
    setFilteredShows(
      data.shows.filter(show => tvShowMatchesQuery(show, query))
    );
  }, [query, data]);

  return (
    <div className="TVShowList">
      <div id="controlPanel">
        <span className="control">Filtering for </span>
        <input
          id="searchInput"
          className="control"
          type="text"
          placeholder="search for a show"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <div className="control" id="filterSummary">
          {filteredShows.length}
        </div>
      </div>
      {!loading ? (
        <div>
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
                  <div className="panel panel-two">
                    {stripTags(item.summary)}
                  </div>
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
      ) : (
        <div id='loadingNotice'>"loading..."</div>
      )}
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
