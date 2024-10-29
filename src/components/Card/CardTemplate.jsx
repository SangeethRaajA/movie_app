import { Button, Card, Col } from "antd";
import { Link } from "react-router-dom";

const image_path = "https://image.tmdb.org/t/p/w500";

const contentStyle = {
  padding: 10,
  width: 240,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const CardTemplate = ({ movie, selectMovie }) => {
  // console.log(movie)

  return (
    <div style={{ padding: 20 }} onClick={() => selectMovie(movie)}>
      <Col span={6}>
        <Card
          hoverable
          style={contentStyle}
          cover={
            <img alt="..." src={image_path + movie.poster_path} style={{}} />
          }
        >
          <Card.Meta
            title={movie.name ? movie.name : movie.title}
            description={"Rating : " + movie.vote_average.toFixed(1)}
          />
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            {/* <Button>View</Button> */}
          </Link>
        </Card>
      </Col>
    </div>
  );
};

export default CardTemplate;
