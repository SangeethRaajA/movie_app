import { Row } from "antd";
import { useEffect, useState } from "react";
import CardTemplate from "../../components/Card/CardTemplate";
import FilterComponent from "../../components/Filter/FilterComponent";
import HeroSection from "../../components/Hero/HeroSection";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";

const SearchPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectMovie, setSelectMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [mType, setMType] = useState("movie");
  const [genre, setGenre] = useState("");

  const fetchGenres = async (type) => {
    const url = `${base_url}/genre/${type}/list?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = async (searchKey = "") => {
    const type = searchKey ? "search" : "discover";
    const url = searchKey
      ? `${base_url}/search/${mType}?api_key=${API_KEY}&query=${searchKey}`
      : `${base_url}/discover/${mType}?api_key=${API_KEY}${
          genre ? `&with_genres=${genre}` : ""
        }`;

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
    fetchGenres(mType);
    fetchMovies();
  }, [mType, genre]);

  const handleFilter = ({ searchKey, mType, genre }) => {
    setMType(mType);
    setGenre(genre);
    fetchMovies(searchKey);
  };

  return (
    <>
      
      <Row>
      <HeroSection movie={selectMovie} />
      </Row>
      <Row justify="space-around" style={{ padding: "10px", backgroundColor:"InfoBackground" }} >
        <FilterComponent
          onFilter={handleFilter}
          genres={genres}
          setMType={setMType}
          setGenre={setGenre}
        />
      </Row>
      <Row justify="space-around" style={{ padding: "10px" }}>
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

export default SearchPage;
