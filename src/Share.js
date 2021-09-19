import React from 'react';
class Share extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUpdate = this.handleDelete.bind(this);
    }
    handleSubmit() {
        this.props.handleShareSubmit();
    }
    handleChange(event) {
        this.props.handleInputChange(event.target);
    }

    handleUpdate() {
        this.props.handleShareUpdate();
    }

    handleDelete() {
        this.props.handleShareDelete();
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <label htmlFor="summaryDescription">Supplement List Description</label>
                        <input type="textarea" className="form-control" name="summaryDescription" id="summaryDescription" placeholder="Anything to say about this list?" value={this.props.summaryDescription || ''} onChange={this.handleChange} />
                    </div>                    
                    <div>
                        <input className="form-check-input" type="checkbox" name='editable' id="editable" value={this.props.editable} checked={this.props.editable} onChange={this.handleChange}/>
                        <label className ="form-check-label" htmlFor="editable">
                        Should this list be editable?
                        </label>
                    </div>
                </div>
                <div>
                    {this.props.shareId === '' && (<button className="btn btn-primary" onClick={this.props.handleShareSubmit}>Create Shareable Link</button>)}
                    <span id="shareId"></span>
                </div>
                {this.props.shareId !== '' && (
                    <div>
                        <div>
                            <button className="btn btn-primary" onClick={this.props.handleShareUpdate}>Update Shared List</button>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={this.props.handleShareDelete}>Delete Share</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Share;