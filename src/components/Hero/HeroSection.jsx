import { Row } from "antd";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const HeroSection = ({ movie }) => {
  return (
    <Row>
      <div
        className="hero"
        style={{
          padding: 20,
          backgroundImage: `url(${IMAGE_PATH}${movie.backdrop_path})`,
        }}
      >
        <div className="hero-context">
          <h2 className="hero-title">{movie.title ? movie.title : movie.name}</h2>
          {movie.overview ? <p>{movie.overview}</p> : null}
        </div>
      </div>
    </Row>
  );
};

export default HeroSection;