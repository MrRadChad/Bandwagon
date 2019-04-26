import React from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import BandsDashboard from "./Components/BandsDashboard/BandsDashboard";
import NavBar from "./Components/Nav/NavBar/NavBar";
import BandForm from "./Components/BandForm/BandForm";
import FansDashboard from "../src/Components/Users/FansDashboard/FansDashboard";
import Band from "./Components/Bands/Band";
import UserDetails from "./Components/Users/UserDetails/UserDetails";
import SettingsDashboard from "./Components/Users/Settings/SettingsDashboard";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <div>
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
                <Route path="/bands" component={BandsDashboard} />
                <Route path="/band/:id" component={Band} />
                <Route path="/fans" component={FansDashboard} />
                <Route path="/band/:id" component={Band} />
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
