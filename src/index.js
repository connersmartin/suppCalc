import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Header from './header';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={App} />
        <Route path="/:id" component={App} />        
      </Switch>
      
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
