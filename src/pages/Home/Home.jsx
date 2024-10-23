import { useEffect, useState } from "react";
import CardTemplate from "../../components/Card/CardTemplate";
import { Button, Row } from "antd";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";
let IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectMovie, setSelectMovie] = useState({});

  const fetchMovies = async () => {
    const url = base_url + "/discover/movie?api_key=" + API_KEY;
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
      <div
        className="hero"
        style={{
          padding: 25,
          backgroundImage: `url(${IMAGE_PATH}${selectMovie.backdrop_path})`,
        }}
      >
        <div className="hero-context">
          <Button type="primary" color="danger">Play Trailer</Button>
          <h2 className="hero-title">{selectMovie.title}</h2>
          {selectMovie.overview ? <p>{selectMovie.overview}</p> : null}
        </div>
      </div>
      <Row justify="space-around" style={{paddingTop:15, backgroundColor:"GrayText"}}>
        {movieData.length === 0 ? (
          <p>Not Found</p>
        ) : (
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
    </>
  );
};

export default Home;
