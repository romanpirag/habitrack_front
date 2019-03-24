import React, { Component } from "react"
import { Link} from "react-router-dom"

class Home extends Component {
  state = {}
  render() {
    return (
      <>
        <button className="signup2 logtitle" disable />
        <br />
        <img
          className="LOGO"
          alt="Nothing"
          src="https://i.imgur.com/VQcdCjS.png"
        />

        <h5 className="tagline">Journal Of Exceptional Practices</h5>

        <Link to={"/register"}>
          <button className="signup">Signup</button>
        </Link>
      </>
    )
  }
}

export default Home
