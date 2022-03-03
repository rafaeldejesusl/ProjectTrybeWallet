import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/ProjectTrybeWallet/" component={ Login } />
      <Route exact path="/ProjectTrybeWallet/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
