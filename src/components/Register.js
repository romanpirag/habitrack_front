import React, { Component } from "react"
import { withRouter } from "react-router-dom"

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
    fetch("https://habitrack-api.herokuapp.com/api/v1/register", {
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
      .then(res => {
        if (!res.ok) {
          throw Error(`Can't Register... username must be unique`)
        } else {
          return res.json()
        }
      })
      .then(data => {
        localStorage.setItem("jwt", data.jwt)
        this.props.getUser(data.user)
        this.props.history.push("/mainpage")
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <>
        <div className="page-title">
          <h1 className="signup-title">SIGN UP!</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="register-field"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input
            id="register-field"
            type="password"
            name="passwordValue"
            value={this.state.bioValue}
            placeholder="Password"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <button className="button signup-submit" type="submit" value="submit">
            submit
          </button>
          <br />
          <br />
          {/* <Link className="button" to={"/"}>
            Back
          </Link> */}
        </form>
      </>
    )
  }
}

export default withRouter(Register)
