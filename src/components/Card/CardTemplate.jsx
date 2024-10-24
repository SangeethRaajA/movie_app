import { Card, Col } from "antd";

const CardTemplate = ({ movie, selectMovie }) => {
  let image_path = "https://image.tmdb.org/t/p/w500";
  return (
    <div style={{ padding: 20 }} onClick={() => selectMovie(movie)}>
      <Col span={6}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="..." src={image_path + movie.poster_path} />}
        >
          <Card.Meta
            title={movie.name ? movie.name : movie.title}
            description={"Rating : " + movie.vote_average.toFixed(1)}
            style={{ textAlign: "center" }}
          />
        </Card>
      </Col>
    </div>
  );
};

export default CardTemplate;