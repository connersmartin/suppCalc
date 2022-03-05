import React from 'react';

class TableDisplay extends React.Component {
    render() {
        return (
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
                    {this.props.rows.map((r) => (
                        <tr key={r.id} >
                            <td><a href={r.link} target='_blank' rel='noreferrer noopener'>{r.supplement}</a></td>
                            <td>{r.cost}</td>
                            <td>{r.servings}</td>
                            <td>{r.servingsPerDay}</td>
                            <td>{parseFloat(r.costPerDay).toFixed(2)}</td>
                            <td><button className="btn" onClick={() => this.props.editRow(r)}>edit</button><button type="button" className="btn" aria-label="delete" onClick={() => this.props.handleDelete(r.id)}>remove</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total: </td>
                        <td>$ {parseFloat(this.props.total).toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}


export default TableDisplay;