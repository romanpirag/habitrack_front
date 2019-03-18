import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import "./App.css"
import MainPage from "./components/MainPage"
import WelcomePage from "./components/WelcomePage"
import SkillSelect from "./components/SkillSelect"
import Login from "./components/Login"
import Register from "./components/Register"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <header className="app-header">
              <div>
                <Link to={"/"}>
                  <h5 className="grand">the Grand</h5>
                  <h1 className="maintitle">Habitary</h1>
                </Link>
                  <h4 className="tagline">Journal Of Exceptional Practices</h4>
              </div>
            </header>
            <main>
              <Switch>
                <Route exact path="/mainpage" component={MainPage} />
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/skillselect" component={SkillSelect} />        
                <Route exact path="/login" component={Login} />        
                <Route exact path="/register" component={Register} />        
              </Switch>
            </main>
            <footer className="footer">&copy; ROMA all rights reserved 2019</footer>
          </>
        </Router>
      </div>
    )
  }
}

export default App
