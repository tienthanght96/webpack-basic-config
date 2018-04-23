import React, { Component } from "react";
import "./App.scss";
import Menu from "./../Menu/Menu";
import routes from "./../../routes";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  HashRouter
} from "react-router-dom";
import * as FontAwesome from "react-icons/lib/fa";
import * as FontIonic from "react-icons/lib/io";
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Menu />
          <div className="container">
            <div className="row bg">
              <div >
                <FontAwesome.FaBeer />
                <FontAwesome.FaBeer />
                <FontIonic.IoIosSearchStrong/>
              </div>
              {this.showContentMenus(routes)}
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }

  showContentMenus = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default hot(module)(App)

