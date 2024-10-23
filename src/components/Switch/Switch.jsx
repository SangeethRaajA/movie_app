import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

const Switch = ({ name }) => {
  return (
      <Flex
      gap="middle"
      justify="start"
      align="center"
      style={{ paddingLeft: 15 }}
    >
      <h2 style={{ color: "#001529" }}>{name}</h2>

      <Button size="large">
        <Link to="/movies">Movies</Link>
      </Button>

      <Button size="large">
        <Link to="/series">Series</Link>
      </Button>
    </Flex>
  );
};

export default Switch;
