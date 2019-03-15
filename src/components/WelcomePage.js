import React from 'react'


class WelcomePage extends React.Component {
    state = {}
    render() {
        return (
        <>
            {/* <h1>Welcome!</h1> */}
            <form className="logform">
                <h3 className="please-log">Please Log In:</h3>
                <input className="logname" type="text" placeholder="Enter Your Name" />
                <br/>
                <input className="logpass" type="text" placeholder="Enter Your Password" />
           
                <br />
                <button className="logsubmit" type="submit">Submit</button>
            </form>  
           
        </>      
        );
    }
}

export default WelcomePage;