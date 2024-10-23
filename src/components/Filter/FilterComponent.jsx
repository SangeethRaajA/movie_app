import { Button, Form, Input, Select, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { FilterOutlined, PlayCircleOutlined } from "@ant-design/icons"; // For icons

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
    <div style={{ textAlign: "center", paddingLeft:15 }}>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col>
          <h2
            style={{
              color: "#001529",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            FILTER
          </h2>
        </Col>
      </Row>

      <Form
        name="filter_form_controls"
        layout="inline"
        onFinish={onFinish}
        style={{ justifyContent: "center" }}
      >
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
              width: "150px",
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
              width: 120,
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

        <Form.Item>
          <Select
            value={genre}
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              color: "#000",
              border: "1px solid #d9d9d9",
              width: 150,
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
            }}
          >
            <FilterOutlined style={{ marginRight: "5px", }} />
            Filter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FilterComponent;
