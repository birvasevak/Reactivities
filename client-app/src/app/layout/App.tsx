import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </Fragment>
  );
}

export default observer(App);
