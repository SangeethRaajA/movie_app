import { Flex, Row } from "antd";
import { useEffect, useState } from "react";
import SiderCard from "../SiderCard/SiderCard";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";

const SiderMain = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectMovie, setSelectMovie] = useState({});

  const fetchMovies = async () => {
    const url = base_url + "/trending/all/day?api_key=" + API_KEY;
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
    <>
      <h2 style={{ color: "#fff" }}>Trending</h2>
      <Flex align="stretch" justify="space-around">
        <Row  justify="space-around" >
          {movieData.length === 0 ? (
            <p>Not Found</p>
          ) : (
            movieData.map((res, pos) => {
              return (
                <SiderCard movie={res} selectMovie={setSelectMovie} key={pos} />
              );
            })
          )}
        </Row>
      </Flex>
    </>
  );
};

export default SiderMain;
