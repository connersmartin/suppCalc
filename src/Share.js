import React from 'react';
import { v4 } from 'uuid';

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleSubmit() {
        console.log("Share clicked!");
        let shareObj = {};
        shareObj.rows = this.props.rows
        shareObj.uid = v4();
        this.setState({shareId: shareObj.uid});
        let data = JSON.stringify(shareObj);
        console.log(data);
        let share = document.getElementById('shareId');
        share.innerText = this.state.shareId;
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Share</button>
                <span id="shareId"></span>
            </div>
        )
    }
}

export default Share;