import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import 'react-toastify/dist/ReactToastify.css';
import "axios-progress-bar/dist/nprogress.css";
import Index from './components/Index';
import CreateAuction from './components/CreateAuction';
import "react-datetime/css/react-datetime.css";




loadProgressBar();
class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/create-auction" exact component={CreateAuction} />
        </Switch>
      </>
    )
  }
}


export default withRouter(App);
