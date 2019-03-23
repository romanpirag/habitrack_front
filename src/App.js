import React from "react"
import { Route, Switch, Link, withRouter } from "react-router-dom"
import "./App.css"
import MainPage from "./components/MainPage"
import SkillSelect from "./components/SkillSelect"
import Login from "./components/Login"
import Register from "./components/Register"

class App extends React.Component {
  state = {
    user: {}
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      user: {}
    })
    this.props.history.push("/login")
  }

  // --------------------FETCHES THE SINGLE USER-----------------

  getUser = user => {
    this.setState({
      user
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
        if (res.ok) {
          return res.json()
        }
        throw new Error("Not logged in...", res)
      })
      .then(data => {
        this.setState({ user: data.user })
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  render() {
    return (
      <div className="App">
        <img
          className="topimage"
          alt="Nothing"
          src="https://i.imgur.com/lNzL1Jw.png"
        />
        <img
          className="bottimage"
          alt="Nothing"
          src="https://i.imgur.com/Yb4LIvq.png"
        />
        <header className="app-header">
          <span className="welcomename">{this.state.user.username}</span>
          <span onClick={this.logout} className="isloggedin">
            log out
          </span>
          <div>
            <Link to={"mainpage"}>
              <div className="maintitle-div">
                {/* <span className="maintitle">Habi</span>
                <span className="maintitle2">track</span> */}
              </div>
            </Link>
            {/* <h5 className="tagline">Journal Of Exceptional Practices</h5> */}
          </div>
        </header>

        <br />
        <main>
          <Switch>
            <Route
              exact
              path="/mainpage"
              render={props => <MainPage user={this.state.user} />}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Login user={this.state.user} getUser={this.getUser} />
              )}
            />
            <Route
              exact
              path="/skillselect"
              render={props => <SkillSelect user={this.state.user} />}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login user={this.state.user} getUser={this.getUser} />
              )}
            />
            <Route
              exact
              path="/register"
              render={props => (
                <Register user={this.state.user} getUser={this.getUser} />
              )}
            />
          </Switch>
        </main>
        <footer className="footer">
          {/* <a className="gitlink" href="https://github.com/romabot">
            <i class="fab fa-github-square" />
          </a> */}
          {/* <p>&copy; ROMA all rights reserved 2019</p> */}
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
