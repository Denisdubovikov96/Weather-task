import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../../containers/Layout/Layout";
import WeatherError from "../../hoc/WeatherError";
import MainRoute from "../../routes/MainRoute";
import MyLocations from "../../routes/MyLocations";

function App() {
  return (
    <Router>
      <Layout>
        <WeatherError>
          <Switch>
            <Route path="/" exact component={MainRoute} />
            <Route path="/my-locations" component={MyLocations} />
          </Switch>
        </WeatherError>
      </Layout>
    </Router>
  );
}

export default App;
