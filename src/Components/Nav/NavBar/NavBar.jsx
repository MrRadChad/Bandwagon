import React, { Component } from "react";
import {connect} from 'react-redux'
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Signedout from "./Menus/Signedout";
import Signedin from "./Menus/Signedin";
import {openModal} from '../../../Modals/ModalActions'
import {logout} from '../../../Auth/AuthActions'

const actions = {
  openModal,
  logout
}

const mappedState = (state) => ({
  authenticated: state.authenticated
})

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const { authenticated, currentUser } = this.props.authenticated;
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
              <Signedin currentUser={currentUser} signOut={this.handleSignOut} />
            ) : (
              <Signedout signIn={this.handleSignIn} register={this.handleRegister} />
            )}
            {console.log(authenticated)}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(connect(mappedState, actions)(NavBar));
