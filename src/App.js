import './App.css';
import React from 'react';
import RowInputs from './RowInputs';
import Share from './Share';


class App extends React.Component {

  render() {
    return (
      <div>
        <div className="App">
          <h1>Hey, this calculates your daily expenditure on supplements</h1>
        </div>
        <RowInputs />
        <Share />
      </div>
    );
  }
}

export default App;
