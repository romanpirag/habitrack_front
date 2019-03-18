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
      })
  }

  render() {
    return (
      <>
        <h4 className="create-text">REGISTER</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            className="create-form"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
          />
          <input
            className="create-form"
            type="password"
            name="passwordValue"
            value={this.state.bioValue}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <input className="submit" type="submit" value="submit" />
        </form>
      </>
    )
  }
}

export default Register
