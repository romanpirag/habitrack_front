import React from "react"
import { Link } from "react-router-dom" 
import SkillSelect from "./SkillSelect"

class MainPage extends React.Component {
  state = {
    user: ""
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
        this.setState({
          user: data.user.username
        })
      })
      .catch(e => {
        this.props.history.push("/login")
      })
  }

  render() {
      return (
          <>
        <h2 className="welcomename">{this.state.user}</h2>
        <h2 className="isloggedin">logged in</h2>
        <Link to={"/skillselect"}><button className="skillbutton">SELECT SKILL</button></Link>
        {/* <SkillSelect/> */}
      </>
    )
  }
}

export default MainPage
