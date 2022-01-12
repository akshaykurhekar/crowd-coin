import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";
// import {Title} from 'next/title';
import "semantic-ui-css/semantic.min.css";

const Layout = (props) => {
  return (
    <Container>
      <title>Crowd Coin</title>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
