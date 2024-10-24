import { useEffect, useState } from "react";
import { Pagination, Row, Space } from "antd";
import React from "react";
import CardTemplate from "../../components/Card/CardTemplate";
import HeroSection from "../../components/Hero/HeroSection";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";

const PAGE_SIZE = 12;

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectMovie, setSelectMovie] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedMovies = movieData.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <Row>
        <HeroSection movie={selectMovie} />
      </Row>
      <Row
        justify="space-around"
        style={{ paddingTop: 15, backgroundColor: "" }}
      >
        {paginatedMovies.length === 0 ? (
          <p>Not Found</p>
        ) : (
          paginatedMovies.map((res, pos) => {
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

      <Row justify="center" style={{ marginTop: 20 }}>
        <Space direction="vertical">
          <Pagination
            current={currentPage}
            total={movieData.length}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </Space>
      </Row>
    </>
  );
};

export default Movies;
