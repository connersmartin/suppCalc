import './App.css';
import React from 'react';
import RowInputs from './RowInputs';
import Share from './Share';
import TableDisplay from './TableDisplay';
import { v4 } from 'uuid';
import { withRouter } from 'react-router-dom';

const axios = require('axios');
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
      shareId: '',
      editable: false,
      summaryDescription: ''
    }

  }
  handleShareSubmit() {
    let shareObj = {};
    shareObj.rows = this.state.rows;    
    shareObj.description = this.state.summaryDescription;
    shareObj.editable = this.state.editable;
    shareObj.id = v4();
    //this will send to an API to create
    this.makeApi('post', shareObj, '');
    this.populateShare(shareObj.id);
  }

  handleShareUpdate() {

    let shareObj = {};
    shareObj.rows = this.state.rows;
    shareObj.id = this.state.shareId;
    shareObj.description = this.state.summaryDescription;
    shareObj.editable = this.state.editable;
    console.log(shareObj);
    //this will send update to an API
    this.makeApi('put', shareObj, shareObj.id);
    //handle success    
    this.populateShare(shareObj.id);
  }

  handleShareDelete() {
    let shareObj = {};
    shareObj.id = this.state.shareId;
    //this will send update to an API
    this.makeApi('delete', null, shareObj.id);
    //handle success
  }

  handleInputChange(target) {
    console.log(target.type);
    const value = target.type === 'checkbox' ? target.checked : target.value;
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

  makeApi(method, obj, param) {
    let data;
    if (obj !== null) {
      data = JSON.stringify(obj);
    }
    let url = process.env.REACT_APP_BASEURL;
    if (param !== '') {
      url = `${url}/${param}`;
    }
    var config = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        //handle Success
      })
      .catch(function (error) {
        console.log(error);
        //handle Error
      });
  }

  handleApiResponse(data) {
    if (data) {
      let rows = data.rows.map(r => r = {
        id: r.id,
        supplement: r.supplement,
        cost: r.cost,
        servings: r.servings,
        servingsPerDay: r.servingsPerDay,
        costPerDay: r.costPerDay
      });
      this.setState({
        editable: data.editable,
        summaryDescription: data.description,
        rows: rows,
        total: this.getSum(rows)
      });
      this.populateShare(data.id);
    }
    //handle no data case
  }

  //this should only happen if an ID is provided
  componentDidMount() {
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
          handleInputChange={this.handleInputChange.bind(this)}
          handleShareUpdate={this.handleShareUpdate.bind(this)}
          handleShareDelete={this.handleShareDelete.bind(this)}
          shareId={this.state.shareId}
          summaryDescription={this.state.summaryDescription}
          editable={this.state.editable}
        />
      </div>
    );
  }
}

export default withRouter(App);
