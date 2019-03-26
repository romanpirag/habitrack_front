import React from "react"
import { Route, Switch, withRouter, Link } from "react-router-dom"
import "./App.css"
import MainPage from "./components/MainPage"
import SkillSelect from "./components/SkillSelect"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import DayInfo from "./components/DayInfo"

class App extends React.Component {
  state = {
    user: {}
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      user: {}
    })
    this.props.history.push("/")
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
        <header className="app-header">
          <div className="maintitle-div">
            {this.state.user.id ? (
              <>
                <Link to={"/mainpage"}>
                  {/* <span className="maintitle">Habi</span>
                  <span className="maintitle2">track</span> */}
                  <img
                    className="LOGOsmall"
                    alt="Nothing"
                    src="https://i.imgur.com/4B4l9qw.png"
                  />
                </Link>
              </>
            ) : (
              <>
                <img
                  className="LOGOsmall"
                  alt="Nothing"
                  src="https://i.imgur.com/4B4l9qw.png"
                />
              </>
            )}
          </div>

          {this.state.user.username ? (
            <div className="user-info">
              <span className="welcomename">
                {this.state.user.username}
              </span>
              <span onClick={this.logout} className="isloggedin logout">
                {" "}
                log out
              </span>
            </div>
          ) : (
            <Login user={this.state.user} getUser={this.getUser} />
          )}
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
                <Home user={this.state.user} getUser={this.getUser} />
              )}
            />

            <Route
              exact
              path="/skillselect"
              render={props => <SkillSelect user={this.state.user} />}
            />

            <Route
              exact
              path="/register"
              render={props => (
                <Register user={this.state.user} getUser={this.getUser} />
              )}
            />

            <Route
              exact
              path="/day/:id"
              render={props => <DayInfo {...props} />}
            />
          </Switch>
        </main>
        <footer className="footer">
          <div className="footer-div">
            <a
              className="gitlink"
              href="https://github.com/romabot"
              target="_blank"
            >
              <i class="fab fa-github-square" />
            </a>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/roma-pirag-690979172/"
              target="_blank"
            >
              <i class="fab fa-linkedin" />
            </a>
            <h1 className="copyright">
              &copy; ROMABot all rights reserved 2019
            </h1>
          </div>
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
