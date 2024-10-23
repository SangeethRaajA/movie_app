import { useEffect, useState } from "react";
import { Row } from "antd";
import React from "react";
import CardTemplate from "../../components/Card/CardTemplate";
import Switch from "../../components/Switch/Switch";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";
let sub_url = "/discover/tv?api_key=";
let url = base_url + sub_url + API_KEY;

const Series = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => console.error("Error fetching data: ", err)); 
  }, [url_set]);

  // console.log(movieData)

  return (
    <div>
      <Switch name="Latest Series"/>
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

export default Series;
