import { Row } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import Switch from "../../components/Switch/Switch";
import CardTemplate from "../../components/Card/CardTemplate";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";
let search_url = `/search/movie?api_key=${API_KEY}&query=`;
let popular_url = `/movie/popular?api_key=${API_KEY}`;

const Search = ({ searchTerm }) => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(base_url + popular_url);

  useEffect(() => {
    const fetchUrl = searchTerm
      ? base_url + search_url + searchTerm
      : base_url + popular_url;

    setUrl(fetchUrl);
  }, [searchTerm]);

  console.log(searchTerm)

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, [url_set]);

  return (
    <div>
      <Switch name="Recommendation" />
      <Row justify="space-around">
        {movieData.length === 0 ? (
          <p>Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <CardTemplate info={res} key={pos} />;
          })
        )}
      </Row>
    </div>
  );
};

export default Search;
