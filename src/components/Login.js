import React, { Component } from "react"
import { Link } from "react-router-dom"

class Login extends Component {
  defaultState = {
    usernameValue: "",
    passwordValue: ""
  }
  state = this.defaultState

  handleInputChange = e => {
    const inputName = e.target.name

    this.setState({
      [inputName]: e.target.value
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => {
        console.log(res)
        if (res.ok) {
          return res.json()
        }
        throw new Error("Not logged in...", res)
      })
      .then(data => {
        this.props.history.push("/mainpage")
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameValue,
          password: this.state.passwordValue
        }
      })
    })
      .then(res => {
        if (!res.ok) {
          throw Error("Not logged in...", res.statusText)
        } else {
          return res.json()
        }
      })

      .then(data => {
        localStorage.setItem("jwt", data.jwt)
        this.props.history.push("/mainpage")
      })
  }

  render() {
    return (
      <>
        <form className="logform" onSubmit={this.handleSubmit}>
          <h4 className="logtitle">Login</h4>
          <input
            className="logname"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input
            className="logpass"
            type="password"
            name="passwordValue"
            value={this.state.bioValue}
            placeholder="Password"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input className="logsubmit" type="submit" value="submit" />
          <br />
          <Link to={"/register"}>
            <button className="signup">Signup</button>
          </Link>
        </form>
      </>
    )
  }
}

export default Login
