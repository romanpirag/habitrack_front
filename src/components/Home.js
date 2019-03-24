import React, { Component } from "react"
import { Link} from "react-router-dom"

class Home extends Component {
  state = {}
  render() {
    return (
      <>
        <div className="page-title">
          <h1 className="signup-title">SIGN UP!</h1>
        </div>
        <img
          className="LOGO"
          alt="Nothing"
          src="https://i.imgur.com/VQcdCjS.png"
        />

        <h5 className="tagline">Journal Of Exceptional Practices</h5>

        <Link className="button" to={"/register"}>Signup</Link>
      </>
    )
  }
}

export default Home
