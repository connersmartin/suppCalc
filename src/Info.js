import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.handleNew = this.handleNew.bind(this);
        this.handleFind = this.handleFind.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleNew() {
        this.props.handleNewShare();
    }
    handleFind() {
        this.props.handleFindShare();
    }
    handleGet() {
        this.props.handleGetShare();
    }
    handleChange(event) {
        this.props.handleInputChange(event.target);
    }

    render() {
        return (
            <div>
                <div className='m-1'>
                    <h1>This calculates your daily expenditure on supplements</h1>
                    <p>Enter in supplement cost information and click 'Add' to start your list</p>
                    <p>Clicking 'Create Shareable Link' will save this information and it can be shared to anyone</p>
                </div>
                <div className='btn btn-group'>
                    <div>
                        <button className='btn btn-primary m-1' name='newShare' id='newShare' onClick={this.handleNew}>Create a New List</button>
                    </div>
                    <div>
                        <button className='btn btn-primary m-1' name='findShare' id='findShare' onClick={this.handleFind}>Find a List</button>
                    </div>
                </div>
                {!this.props.newShare && this.props.findShare &&
                    <div>
                        <label className='m-1' htmlFor="shareId">Enter an Id</label>
                        <input type="test" className="form-control m-1" name="shareId" id="shareId" placeholder="Enter an Id to pull up a shared supplement list" value={this.props.shareId || ''} onChange={this.handleChange} />
                        <button className='btn btn-primary m-1' name='getShare' id='getShare' onClick={this.handleGet}>Get This List</button>
                    </div>
                }
            </div>
        )
    }
}

export default Info;