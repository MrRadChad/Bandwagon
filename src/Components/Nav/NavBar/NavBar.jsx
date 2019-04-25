import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header>
              <img src="assets/logo.png" alt="logo" />
              Bandwagon
            </Menu.Item>
            <Menu.Item name="Bands" />
            <Menu.Item>
              <Button
                floated="right"
                positive
                inverted
                content="Add Your Band"
              />
            </Menu.Item>
            <Menu.Item position="right">
              <Button basic inverted content="Login" />
              <Button
                basic
                inverted
                content="Sign Out"
                style={{ marginLeft: "0.5em" }}
              />
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}
