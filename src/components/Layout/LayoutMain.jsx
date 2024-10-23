import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Navbar from "../Navbar/Navbar";
import SiderMain from "../Sider/SiderMain";

const LayoutMain = ({ children }) => {

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop:-20
        }}
      >
        <Navbar />
      </Header>
      <Layout>
        <Content>{children}</Content>
        <Sider
          width="25%"
          style={{ textAlign: "center", padding: 10, display: "block" }}
          breakpoint="md"
          collapsedWidth="0"
        >
          <Content>
            <SiderMain />
          </Content>
        </Sider>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Movies Night © {new Date().getFullYear()} v1.1.1
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
