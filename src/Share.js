import React from 'react';

class Share extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleSubmit() {
        console.log("Share clicked!");
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Share</button>
            </div>
        )
    }
}

export default Share;