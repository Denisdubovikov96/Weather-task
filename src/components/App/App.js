import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../../hoc/Layout/Layout";
import MainRoute from "../../routes/MainRoute";
import MyLocations from "../../routes/MyLocations";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={MainRoute} />
          <Route path="/my-locations" component={MyLocations} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
