import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class DayInfo extends Component {  
  state = {
    day: {}
  }

  dayId = this.props.match.params.id


  componentDidMount = () => {
    
    fetch(`http://localhost:3000/api/v1/days/${this.dayId}`, {
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
        throw new Error("Can't get day", res)
      })
      .then(data => {
        this.setState({ day: data })
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  clickHandle = () => {
      fetch(`http://localhost:3000/api/v1/days/${this.dayId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer: ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
              completed: !this.state.day.completed 
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json()
              }
              throw new Error("Can't PATCH", res)
          })
          .then(data => {
              this.setState({ day: data })
              this.props.history.push("/mainpage")
          })
          .catch(e => {
              console.log("Oh noes")
          })
  }

  render() {
    return (
      <>
        <div className="page-title">
          <h1 className="signup-title">
            DAY PLACEHOLDER: day {this.props.match.params.id}
          </h1>
          <button onClick={this.clickHandle}>CLOCK OUT!</button>
        </div>

        <Link className="button" to={"/mainpage"}>
          Back
        </Link>
      </>
    )
  }
}

export default withRouter(DayInfo)
