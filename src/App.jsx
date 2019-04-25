import React from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "./Components/EventDashboard/EventDashboard";
import NavBar from "./Components/Nav/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </div>
  );
}

export default App;
