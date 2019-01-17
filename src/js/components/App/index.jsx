import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import asyncComponent from '../HOC/asyncComponent';
import isAuthenticated from '../HOC/isAuthenticated';
import '../utils/icons';

const Login = asyncComponent(() =>
  import('../pages/Login').then((module) => module.default)
);

const Home = asyncComponent(() =>
  import('../pages/Home').then((module) => module.default)
);

const routes = [
  {path: '/Login', component: Login},
  {path: '/', component: isAuthenticated(Home)},
];

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    );
  }
}
