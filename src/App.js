import './App.css';
import React from 'react';
import RowInputs from './RowInputs';
import Share from './Share';
import TableDisplay from './TableDisplay';
import { v4 } from 'uuid';
import {withRouter} from 'react-router-dom';

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplement: '',
      cost: 0,
      servings: 0,
      servingsPerDay: 0,
      costPerDay: 0,
      total: 0,
      rows: [],
      shareId: ''
    }

  }
  handleShareSubmit() {
    let shareObj = {};
    shareObj.rows = this.state.rows
    shareObj.uid = v4();
    //this will send to an API to create
    let data = JSON.stringify(shareObj);
    console.log(data);
    this.populateShare(shareObj.uid);
  }

  handleShareUpdate() {
    let shareObj = {};
    shareObj.rows = this.state.rows
    shareObj.uid = this.state.shareId
    //this will send update to an API
    let data = JSON.stringify(shareObj);
    console.log(data);    
  }

  handleInputChange(target) {
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let dailyCost = this.calculate();
    //add a new row
    this.addNewRow();
    //total gets added
    this.setState({
      total: this.state.total + dailyCost,
      supplement: '',
      cost: 0,
      servings: 0,
      servingsPerDay: 0
    });

  }

  populateShare(uid) {
    let share = document.getElementById('shareId');
    share.innerText = uid;
    this.setState({ shareId: uid });
  }

  editRow(row) {
    //edit the row       
    let rows = this.state.rows;
    rows = rows.filter(r => r.id !== row.id);
    this.setState({
      supplement: row.supplement,
      cost: row.cost,
      servings: row.servings,
      servingsPerDay: row.servingsPerDay,
      rows: rows,
      total: this.getSum(rows)
    });
  }
  handleDelete(id) {
    //delete the row
    let rows = this.state.rows;
    rows = rows.filter(r => r.id !== id);
    this.setState({
      rows: rows,
      total: this.getSum(rows)
    });
  }

  addNewRow() {
    //TODO regex to get numbers in a better place validation wise?        
    let rows = this.state.rows;
    rows.push({
      id: v4(),
      supplement: this.state.supplement,
      cost: this.state.cost,
      servings: this.state.servings,
      servingsPerDay: this.state.servingsPerDay,
      costPerDay: this.calculate()
    })
    this.setState({ rows: rows });
  }

  calculate() {
    let cost = parseFloat(this.state.cost);
    let servings = parseFloat(this.state.servings);
    let servingsPerDay = parseFloat(this.state.servingsPerDay);
    return (cost / servings) * servingsPerDay;
  }

  getSum(rows) {
    let sum = 0;
    if (rows.length > 0) {
      rows.forEach(r => sum = sum + r.costPerDay)
    }
    return sum;
  }

  handleApiResponse(data) {
    let rows = data.rows.map(r => r = {
      id: r.id,
      supplement: r.supplement,
      cost: r.cost,
      servings: r.servings,
      servingsPerDay: r.servingsPerDay,
      costPerDay: r.costPerDay
    });
    this.populateShare(data.id);
    this.setState({
      rows: rows,
      total: this.getSum(rows)
    });
  }

  //this should only happen if an ID is provided
  componentDidMount() {
    console.log(this.props.location.pathname);
    if (this.props.location.pathname !== '/') {
      fetch(`${process.env.REACT_APP_BASEURL}${this.props.location.pathname}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.handleApiResponse(result);
          },
          (error) => {
            //figure out how to handle error
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <h1>Hey, this calculates your daily expenditure on supplements</h1>         
        </div>
        <RowInputs handleInputChange={this.handleInputChange.bind(this)}
          handleFormSubmit={this.handleFormSubmit.bind(this)}
          supplement={this.state.supplement}
          cost={this.state.cost}
          servings={this.state.servings}
          servingsPerDay={this.state.servingsPerDay}
          costPerDay={this.state.costPerDay}
        />

        <TableDisplay
          total={this.state.total}
          rows={this.state.rows}
          editRow={this.editRow.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
        />
        <Share rows={this.state.rows}
          handleShareSubmit={this.handleShareSubmit.bind(this)}
          handleShareUpdate={this.handleShareUpdate.bind(this)}
          shareId={this.state.shareId}
        />
      </div>
    );
  }
}

export default withRouter(App);
