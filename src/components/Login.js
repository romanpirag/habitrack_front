import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
// ;<i class="fas fa-arrow-alt-circle-left" />


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

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {        //<-----checkes if previous prop.user.id is the same as new props.user.id
      this.props.history.push("/mainpage")             //<--- Doing this so that we don't call this.getDays without a user id. 
    }
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
        this.props.getUser(data.user)
        this.props.history.push("/mainpage")
      })
      .catch(err => {
        alert("Invalid Login")
        this.setState(this.defaultState)
      })
  }

  render() {
    return (
      <>
        <button className="signup2 logtitle" disable>
          Login
        </button>
        <form className="logform" onSubmit={this.handleSubmit}>
          <br />
          <input
            id="logname"
            type="text"
            placeholder="Username"
            name="usernameValue"
            value={this.state.usernameValue}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input
            id="logpass"
            type="password"
            name="passwordValue"
            value={this.state.passwordValue}
            placeholder="Password"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input className="logsubmit" type="submit" value="enter" />
          <br />
          <Link to={"/register"}>
            <button className="signup">Signup</button>
          </Link>
        </form>
      </>
    )
  }
}

export default withRouter(Login)
