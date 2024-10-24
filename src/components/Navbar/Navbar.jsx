import { Button, Dropdown, Flex, Row } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (button) => {
    setActiveButton(button); 
  };

  return (
    <Row justify="space-between" align="middle">
      <Flex gap="middle" justify="space-between" align="center">
        <div className="nav-mob">
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
        </div>

        <h2 style={{ color: "#fff" }}>
          <Link to="/">Movies</Link> NIGHT
        </h2>

        <div className="nav-desk">
          <Button
            color={activeButton === "movies" ? "primary" : "default"}
            variant={activeButton === "movies" ? "contained" : "outlined"}
            onClick={() => handleClick("movies")}
          >
            <Link
              to="/movies"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              MOVIES
            </Link>
          </Button>

          <Button
            color={activeButton === "series" ? "primary" : "default"}
            variant={activeButton === "series" ? "contained" : "outlined"}
            onClick={() => handleClick("series")}
          >
            <Link
              to="/series"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              SERIES
            </Link>
          </Button>

          <Button
            color={activeButton === "search" ? "primary" : "default"}
            variant={activeButton === "search" ? "contained" : "outlined"}
            onClick={() => handleClick("search")}
          >
            <Link
              to="/search"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              SEARCH
            </Link>
            <SearchOutlined />
          </Button>
        </div>
      </Flex>
    </Row>
  );
};

export default Navbar;
