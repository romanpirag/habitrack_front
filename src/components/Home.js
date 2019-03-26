import React, { Component } from "react"
import { Link} from "react-router-dom"

class Home extends Component {
  state = {}
  render() {
    return (
      <>
        <div className="page-title">
        </div>
        <img
                className="LOGO"
          alt="Logo"
                src="https://i.imgur.com/4B4l9qw.png"
        />

        <h5 className="tagline">Journal Of Exceptional Practices</h5>

            <Link className="signup-button" to={"/register"}>signup</Link>
      </>
    )
  }
}

export default Home
