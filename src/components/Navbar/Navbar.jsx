import { Dropdown, Flex, Row } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <Row justify="space-between" align="middle">
      <Flex gap="middle" justify="space-between" align="center">
        <Dropdown
          menu={{
            items: [
              
              {
                key: "1",
                label: <Link to="/movies">Movies</Link>,
              },
              {
                key: "2",
                label: <Link to="/series">Series</Link>,
              },
              {
                key: "3",
                label: <Link to="/search">Search</Link>,
              },
              
            ],
          }}
          placement="bottomLeft"
        >
          <MenuOutlined
            style={{ color: "#fff", fontSize: "24px", cursor: "pointer" }}
          />
        </Dropdown>
        <h2 style={{ color: "#fff" }}><Link to="/">Movies</Link> NIGHT</h2>
      </Flex>
    </Row>
  );
};

export default Navbar;
