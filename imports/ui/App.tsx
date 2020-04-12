import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './theme/NormalTheme';
import Login from './components/Login';
import Main from './components/Main';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/chats" component={Main} exact />
      </Switch>
    </Router>
  </ThemeProvider>
);
