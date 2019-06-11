import React, { Component } from "react";
import {connect} from 'react-redux'
import { withFirebase } from "react-redux-firebase";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Signedout from "./Menus/Signedout";
import Signedin from "./Menus/Signedin";
import {openModal} from '../../../Modals/ModalActions'

const actions = {
  openModal,
}

const mappedState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const {auth, profile} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
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
              <Signedin auth={auth} profile={profile} signOut={this.handleSignOut} />
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

export default withRouter(withFirebase(connect(mappedState, actions)(NavBar)));
