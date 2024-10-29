import { Layout, Space, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "f5baf8c74c7d5f00a242c165979d0913";
const base_url = "https://api.themoviedb.org/3";
const image_path = "https://image.tmdb.org/t/p/w500";

const contentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100vh",
};

const Profile = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  // console.log(id)

  const fetchMovieDetails = async () => {
    const url = `${base_url}/movie/${id}?api_key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  return (
    <Layout>
      <Content style={contentStyle}>
        <Space direction="vertical" align="center" size="large">
          {movieData ? (
            <>
              <img src={image_path + movieData.poster_path} alt={movieData.title} style={{ width: 300 }} />
              <h1>{movieData.title}</h1>
              <p>Rating: {movieData.vote_average}</p>
              <p>{movieData.overview}</p>
            </>
          ) : (
            <Spin tip="Loading..." />
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default Profile;