import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Signedout from "./Menus/Signedout";
import Signedin from "./Menus/Signedin";

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.setState({
      authenticated: true
    });
  };

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push("/");
  };

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="/assets/logo.png" alt="logo" />
              Bandwagon
            </Menu.Item>
            <Menu.Item as={NavLink} to="/bands" name="Bands" />
            {authenticated && <Menu.Item as={NavLink} to="/fans" name="Fans" />}
            {authenticated && (
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createband"
                  floated="right"
                  content="Add Your Band"
                />
              </Menu.Item>
            )}
            {authenticated ? (
              <Signedin signOut={this.handleSignOut} />
            ) : (
              <Signedout signIn={this.handleSignIn} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
