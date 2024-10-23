import { Flex, Row } from "antd";
import { useEffect, useState } from "react";
import SiderCard from "../SiderCard/SiderCard";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
let base_url = "https://api.themoviedb.org/3";
let sub_url = "/trending/all/day?api_key=";
let url = base_url + sub_url + API_KEY;

const SiderMain = () => {
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

  return (
    <>
    <h2 style={{ color: "#fff" }}>Trending</h2>
      <Flex align="stretch" justify="space-around">
      <Row justify="space-around">
          {movieData.length === 0 ? (
            <p>Not Found</p>
          ) : (
            movieData.map((res, pos) => {
              return <SiderCard info={res} key={pos} />;
            })
          )}
        </Row>
      </Flex>
    </>
  );
};

export default SiderMain;
