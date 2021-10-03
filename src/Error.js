const Error = (props) => {
    return (
        <div className="error">
            <p>There was an error: {props.errorMsg}</p>
        </div>
    )
}

export default Error;