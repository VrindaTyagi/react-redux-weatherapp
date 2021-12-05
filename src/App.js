import React, { useState } from "react";
import { store } from "./index";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    code: state && state.cod,
    location: state && state.name,
    temperature: state && state.main && state.main.temp,
    weather: state && state.weather && state.weather.main,
    highTemp: state && state.main && state.main.temp_max,
    lowTemp: state && state.main && state.main.temp_min,
  };
};

const App = (props) => {
  const { location, temperature, weather, lowTemp, highTemp, code } = props;
  const [name, setName] = useState("");

  const today = new Date();
  const date = `  ${today.getDate()} / ${
    today.getMonth() + 1
  } / ${today.getFullYear()}`;

  const api = {
    key: "eadb6006a99afa593f6c38aeb4518d94",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const handleClick = (e) => {
    if (name === "") {
      window.alert("Please enter Valid location");
      return false;
    }
    getResults(name);
  };

  const getResults = async (cityName) => {
    const response = await fetch(
      `${api.base}weather?q=${cityName}&appid=${api.key}`
    );
    const data = await response.json();

    try {
      store.dispatch({ type: "CITY", payload: { data } });
      console.log(data);
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <>
      {code === "404" ? (
        <div className="temp">Error. Refresh Page</div>
      ) : (
        <div className="app-wrap">
          <header>
            <input
              type="text"
              className="search-box"
              placeholder="Search for a city......"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn" onClick={handleClick}>
              Search
            </button>
          </header>

          <main>
            <section className="location">
              <div className="city">{location || "Location"}</div>
              <div className="date">{date}</div>
            </section>
            <div className="current">
              <div className="temp">
                {temperature ? (temperature - 273).toFixed(1) : "Temperature"}
                <span>°c</span>
              </div>
              <div className="weather">{weather || "Weather"}</div>
              <div className="hi-low">
                {lowTemp ? (lowTemp - 273).toFixed(1) : "Low Temp"}°c /
                {highTemp ? (highTemp - 273).toFixed(1) : "High Temp"}°c
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

// export default App;
export default connect(mapStateToProps, null)(App);
