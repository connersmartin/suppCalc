import React from 'react';
import { v4 } from 'uuid';

class RowInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplement: '',
            cost: 0,
            servings: 0,
            servingsPerDay: 0,
            costPerDay: 0,
            total: 0,
            rows: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.editRow = this.editRow.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
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

    handleDelete(id) {
        //delete the row

        let rows = this.state.rows;
        rows = rows.filter(r => r.id !== id);
        this.setState({
            rows: rows,
            total: this.getSum(rows)
        });
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="supplement">Supplement</label>
                        <input type="text" className="form-control" name="supplement" id="supplement" placeholder="Enter supplement name" value={this.state.supplement || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="cost">Cost</label>
                        <input type="number" className="form-control" name="cost" id="cost" placeholder="Enter cost of supplement" value={this.state.cost || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="servings">Servings</label>
                        <input type="number" className="form-control" name="servings" id="servings" placeholder="Enter number of servings" value={this.state.servings || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="servingsPerDay">Servings per Day</label>
                        <input type="number" className="form-control" name="servingsPerDay" id="servingsPerDay" placeholder="Enter number of servings per day" value={this.state.servingsPerDay || ''} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Supplement</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Number of Servings</th>
                            <th scope="col">Servings Per Day</th>
                            <th scope="col">Cost Per Day</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {this.state.rows.map((r) => (
                            <tr key={r.id} >
                                <td>{r.supplement}</td>
                                <td>{r.cost}</td>
                                <td>{r.servings}</td>
                                <td>{r.servingsPerDay}</td>
                                <td>{parseFloat(r.costPerDay).toFixed(2)}</td>
                                <td><button className="btn" onClick={() => this.editRow(r)}>edit</button><button type="button" className="btn" aria-label="delete" onClick={() => this.handleDelete(r.id)}>remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total: </td>
                            <td>$ {parseFloat(this.state.total).toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}


export default RowInputs;