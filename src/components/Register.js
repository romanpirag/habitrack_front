import React, { Component } from "react"

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
        this.props.history.push("/mainpage")
      })
  }

  render() {
    return (
      <>
            <form className="logform" onSubmit={this.handleSubmit}>
        <h4 className="regtitle">REGISTER</h4>
          <input
            className="logname"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
          />
          <br/>
          <input
            className="logpass"
            type="password"
            name="passwordValue"
            value={this.state.bioValue}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <br/>
          <input className="logsubmit" type="submit" value="submit" />
        </form>
      </>
    )
  }
}

export default Register
