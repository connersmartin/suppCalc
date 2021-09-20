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
                        <label className='m-1' htmlFor="summaryDescription">Supplement List Description</label>
                        <input type="textarea" className="form-control m-1" name="summaryDescription" id="summaryDescription" placeholder="Anything to say about this list?" value={this.props.summaryDescription || ''} onChange={this.handleChange} />
                    </div>
                    <div>
                        <input className="form-check-input m-1" type="checkbox" name='editable' id="editable" value={this.props.editable} checked={this.props.editable} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="editable">
                            Should this list be editable?
                        </label>
                    </div>
                </div>
                <div className='btn-toolbar'>
                    {this.props.shareId === '' && (<button className="btn btn-primary m-1" onClick={this.props.handleShareSubmit}>Create Shareable Link</button>)}
                    <span className='m-1' id="shareId" onClick={() => {navigator.clipboard.writeText(this.props.shareUrl)}}></span>
                </div>
                {this.props.shareId !== '' && (
                    <div className='btn-toolbar'>
                        <div>
                            <button className="btn btn-warning m-1" onClick={this.props.handleShareUpdate}>Update Shared List</button>
                        </div>
                        {this.props.editable && (
                            <div>
                                <button className="btn btn-danger m-1" onClick={this.props.handleShareDelete}>Delete Share</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default Share;