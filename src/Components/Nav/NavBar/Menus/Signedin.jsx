import React from "react";
import {Menu, Image, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function Signedin({signOut}) {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/assets/logo.png" />
      <Dropdown pointing="top left" text="Username">
        <Dropdown.Menu>
          <Dropdown.Item text="Add My Band" icon="plus" />
          <Dropdown.Item text="My Band" icon="music" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
          <Dropdown.Item text="Sign Out" onClick={signOut} icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default Signedin;
