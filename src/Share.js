import React from 'react';
class Share extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        this.props.handleShareSubmit();
    }

    render() {        
        return (
            <div>
                <button className="btn btn-primary" onClick={this.props.handleShareSubmit}>Generate Unique Link</button>
                <span id="shareId"></span>
            </div>
        )
    }
}

export default Share;