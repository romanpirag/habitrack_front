import React from "react"
import { Link, withRouter } from "react-router-dom" 
import SkillSelect from "./SkillSelect"

class MainPage extends React.Component {
  state = {}

  getUser = (userObj) => {
    this.props.setUser(userObj)

  }

  getDays = userId => {
    fetch(`http://localhost:3000/api/v1/users/${userId}/days`, {
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
        throw new Error("Can't get days.", res)
      })
      .then(data => {})
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
        this.getDays(data.user.id) // user id??
        this.getUser(data.user)
      })
      .catch(e => {
        this.props.history.push("/login")
      })
  }

  render() {
      return (
        <div className=" clear">
          {/* <h2 className="welcomename">{this.state.user}</h2> */}
          <Link to={"/skillselect"}>
            <button className="skillbutton">ADD ROUTINE</button>
          </Link>
          <div className="skilldiv  ">
            <h3 className="skillform-titles">YOUR DAILY ROUTINES</h3>
          </div>
          <div className="skilldiv ">
            <h3 className="days">DAY 1</h3>
          </div>
          <div className="skilldiv ">
            <h3 className="days">DAY 2</h3>
          </div>
          <div className="skilldiv ">
            <h3 className="days">DAY 3</h3>
          </div>
          <div className="skilldiv ">
            <h3 className="days">DAY 4</h3>
          </div>
        </div>
      )
  }
}

export default withRouter(MainPage)
