import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Header from './header';
import Footer from './Footer';
import RowInputs from './RowInputs';
import Share from './Share';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <RowInputs />
    <Share />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);