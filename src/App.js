import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import "./App.css"
import MainPage from "./components/MainPage"
import SkillSelect from "./components/SkillSelect"
import Login from "./components/Login"
import Register from "./components/Register"

class App extends React.Component {
  state = {
    user: {}
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
       this.setState({user: data.user})
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
        <Router>
          <>
            <header className="app-header">
              <h3 className="welcomename">{this.state.user.username}</h3>
              <h2 className="isloggedin">logged in</h2>
              <div>
                <Link to={"mainpage"}>
                  <h5 className="grand" />
                  <h1 className="maintitle">Habitrack</h1>
                </Link>
                <h4 className="tagline">
                  Journal Of Exceptional Practices
                </h4>
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
              &copy; ROMA all rights reserved 2019
            </footer>
          </>
        </Router>
      </div>
    )
  }
}

export default App
