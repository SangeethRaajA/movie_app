import { useEffect, useState } from "react";
import { Row } from "antd";
import React from "react";
import CardTemplate from "../../components/Card/CardTemplate";
import Switch from "../../components/Switch/Switch";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";

const Series = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectMovie, setSelectMovie] = useState({});

  const fetchMovies = async () => {
    const url = base_url + "/discover/tv?api_key=" + API_KEY;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectMovie(data.results[0]);
      setMovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <Switch name="Latest Series"/>
      <Row justify="space-around">
        {movieData.length === 0 ? (
          <p>Not Found</p>
        ) :(
          movieData.map((res, pos) => {
            return (
              <CardTemplate
                movie={res}  
                selectMovie={setSelectMovie} 
                key={pos}
              />
            );
          })
        )}
      </Row>
    </div>
  );
};

export default Series;
