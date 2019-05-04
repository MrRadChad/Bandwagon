import React from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import BandsDashboard from "./Components/BandsDashboard/BandsDashboard";
import NavBar from "./Components/Nav/NavBar/NavBar";
import BandForm from "./Components/BandForm/BandForm";
import FansDashboard from "../src/Components/Users/FansDashboard/FansDashboard";
import UserDetails from "./Components/Users/UserDetails/UserDetails";
import SettingsDashboard from "./Components/Users/Settings/SettingsDashboard";
import HomePage from "./Components/HomePage/HomePage";
import test from "./Components/Test/test";
import BandDetails from "./Components/BandDetails/BandDetailedView";
import ModalManager from './Modals/ModalManager'

function App() {
  return (
    <div>
      <ModalManager />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Route
        path="/(.+)"
        render={() => (
          <div>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path='/test' component={test} />
                <Route path="/bands" component={BandsDashboard} />
                <Route path="/band/:id" component={BandDetails} />
                <Route path="/manage/:id" component={BandForm} />
                <Route path="/fans" component={FansDashboard} />
                <Route path="/profile/:id" component={UserDetails} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createband" component={BandForm} />
              </Switch>
            </Container>
          </div>
        )}
      />
    </div>
  );
}

export default App;
