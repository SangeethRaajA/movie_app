import { Button, Card, Space } from "antd";
import { Link } from "react-router-dom";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const SiderCard = ({ movie, selectMovie }) => {
  return (
    <div onClick={() => selectMovie(movie)}>
      <Card
        hoverable
        style={{
          margin: 10,
          borderRadius: 15,
          width: 300,
          height: 75,
          padding: "10px",
          display: "flex",
          alignItems: "center",
          backgroundColor:"Gray",
          background: `url(${IMAGE_PATH}${movie.backdrop_path}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <Space
          align="center"
          size="small"
          direction="horizontal"
        >
          <Card
            hoverable
            style={{
              width: 50,
              height: 50,
              marginRight: "15px",
              objectFit: "cover",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            cover={
              <img
                alt={movie.title || movie.name}
                src={IMAGE_PATH + movie.poster_path}
              />
            }
          />

          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px #000000",
              flex: 1,
              textAlign: "left",
            }}
          >
            {movie.title ? movie.title : movie.name}
          </h2>

          <p
            style={{
              background: "yellow",
              width: 25,
              height: 25,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              float: "right"
            }}
          >
            {movie.vote_average.toFixed(1)}
          </p>
        </Space>
      </Card>
    </div>
  );
};

export default SiderCard;
