import React from 'react';

class RowInputs extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.handleInputChange(event.target);

    }
    handleSubmit(event) {
        this.props.handleFormSubmit(event);

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group m-1">
                        <label className='m-1' htmlFor="supplement">Supplement</label>
                        <input type="text" className="form-control m-1" name="supplement" id="supplement" placeholder="Enter supplement name" value={this.props.supplement || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className='m-1' htmlFor="cost">Cost</label>
                        <input type="number" className="form-control m-1" name="cost" id="cost" placeholder="Enter cost of supplement" value={this.props.cost || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className='m-1' htmlFor="servings">Servings</label>
                        <input type="number" className="form-control m-1" name="servings" id="servings" placeholder="Enter number of servings" value={this.props.servings || ''} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className='m-1' htmlFor="servingsPerDay">Servings per Day</label>
                        <input type="number" className="form-control m-1" name="servingsPerDay" id="servingsPerDay" placeholder="Enter number of servings per day" value={this.props.servingsPerDay || ''} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </form>
            </div>
        )
    }
}


export default RowInputs;