import { Button, Form, Input, Select, Row, Col, Flex } from "antd";
import { useState, useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons"; // For icons

const FilterComponent = ({ onFilter, genres, setMType, setGenre }) => {
  const [searchKey, setSearchKey] = useState("");
  const [mType, setMTypeInternal] = useState("movie");
  const [genre, setGenreInternal] = useState("");

  const onFinish = () => {
    onFilter({ searchKey, mType, genre });
  };

  useEffect(() => {
    setMType(mType);
    setGenre(genre);
  }, [mType, genre]);

  return (
    <div>
      <Form
        name="filter_form_controls"
        layout="inline"
        onFinish={onFinish}
        style={{ justifyContent: "center" }}
      >
        <Row gap="middle" justify="space-evenly" align="middle" >

        <Flex justify="flex-start" align="center" style={{margin:10}}>
          <Form.Item>
            <Input
              placeholder="Search..."
              onChange={(e) => setSearchKey(e.target.value)}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                color: "#000",
                border: "1px solid #d9d9d9",
                padding: "5px 10px",
                width: 150,
                height:40
              }}
            />
          </Form.Item>

          <Form.Item>
            <Select
              value={mType}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                color: "#000",
                border: "1px solid #d9d9d9",
                width: 150,
                height:40,
                padding: "5px",
              }}
              onChange={setMTypeInternal}
              options={[
                { label: "Type", value: "" },
                { label: "Movies", value: "movie" },
                { label: "Series", value: "tv" },
              ]}
            />
          </Form.Item>
        </Flex>

        <Flex justify="flex-start" align="center">
          <Form.Item>
            <Select
              value={genre}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                color: "#000",
                border: "1px solid #d9d9d9",
                width: 150,
                height:40,
                padding: "5px",
              }}
              onChange={setGenreInternal}
              options={[
                { label: "Genre", value: "" },
                ...genres.map((g) => ({ label: g.name, value: g.id })),
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#001529",
                borderRadius: "8px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                padding: "5px 15px",
                width:150,
                height:40
              }}
            >
              <FilterOutlined style={{ marginRight: "5px" }} />
              Filter
            </Button>
          </Form.Item>
        </Flex>
        </Row>

      </Form>
    </div>
  );
};

export default FilterComponent;
