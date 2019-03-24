import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class Register extends Component {
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

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        //   Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameValue,
          password: this.state.passwordValue
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("jwt", data.jwt)
        this.props.getUser(data.user)
        this.props.history.push("/mainpage")
      })
  }

  render() {
    return (
      <>
        <div className="page-title">
          <h1 className="signup-title">SIGN UP!</h1>
        </div>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <input
            id="logname"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            id="logpass"
            type="password"
            name="passwordValue"
            value={this.state.bioValue}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <br />
          <input className="logsubmit" type="submit" value="submit" />
          <br />
          <Link to={"/"}>
            <button className="signup">Back</button>
          </Link>
        </form>
      </>
    )
  }
}

export default withRouter(Register)
