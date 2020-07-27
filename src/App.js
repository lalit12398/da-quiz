import React from "react";
import "./App.css";
import { Layout } from "antd";
import Question from "./containers/Question";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header
        style={{ zIndex: 1, width: "100%", color: "#fff" }}
      >
        <div className="logo">DA-Quiz</div>
      </Header>
      <Content style={{ padding: "0 50px", minHeight: "91vh"}}>
        <div
          className="site-layout-content"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Question />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
