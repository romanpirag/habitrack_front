import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom"
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
        this.setState({ user: data.user })
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }
  setUser = user => {
    this.setState({
      user
    })
  }
  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h3 className="welcomename">{this.state.user.username}</h3>
          <h2 onClick={this.logout} className="isloggedin">
            log out
          </h2>
          <div>
            {/* <img
              className="topimage"
              alt="Nothing"
              src="https://i.imgur.com/ihd0kCI.jpg"
            /> */}
            <br />
            <Link to={"mainpage"}>
              <span className="maintitle">Habi</span>
              <span className="maintitle2">track</span>
            </Link>
            <h5 className="tagline">Journal Of Exceptional Practices</h5>
          </div>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/mainpage"
              render={props => <MainPage setUser={this.setUser} />}
            />
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/skillselect"
              render={props => <SkillSelect user={this.state.user} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
          
        </main>
        <footer className="footer">
          {/* <p>&copy; ROMA all rights reserved 2019</p> */}
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
