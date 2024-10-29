import { Button, Layout, Space } from "antd";
import { Content,  } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const contentStyle = {
    display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  backgroundColor:"Gray",
  height: "100vh"
};

const NotFoundPage = () => {
  return (
    <Layout>
    <Content style={contentStyle}>
      <Space direction="vertical" align="center" size="large">
        <p>404 Not Found</p>
        <Button type="default">
          <Link to="/">Home</Link>
        </Button>
      </Space>
    </Content>
  </Layout>
  );
};

export default NotFoundPage;
