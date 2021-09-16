import React from 'react';
class Share extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleSubmit() {
        this.props.handleShareSubmit();
    }

    handleUpdate() {
        this.props.handleShareUpdate();
    }

    render() {
        return (
            <div>
                {this.props.shareId === '' && (<button className="btn btn-primary" onClick={this.props.handleShareSubmit}>Create Shareable Link</button>)}
                <span id="shareId"></span>
                <button className="btn btn-primary" onClick={this.props.handleShareUpdate}>Update Shared List</button>
                <button className="btn btn-primary" >Something Else</button>
            </div>
        )
    }
}

export default Share;