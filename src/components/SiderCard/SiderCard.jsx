import { Col, Flex, Image } from "antd";

const SiderCard = (movie) => {
  let image_path = "https://image.tmdb.org/t/p/w500";

  return (
    <Flex
      gap="middle"
      justify="flex-evenly"
      align="center"
      style={{
        padding: 10,
        margin: 10,
        background:"grey",
        width: 300,
        height: 75,
        borderRadius: 20,
      }}
    >
      <Col span={5}>
        <Image
          alt=".."
          src={image_path + movie.info.poster_path}
          height={50}
          width={50}
          borderRadius={10}
        />
      </Col>
      <Col span={16}>
        <h4 style={{ fontStyle: "oblique" }}>
          {movie.info.name ? movie.info.name : movie.info.title}
        </h4>
      </Col>
    </Flex>
  );
};

export default SiderCard;
