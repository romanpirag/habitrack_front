import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class DayInfo extends Component {
  state = {
    day: {
      feelings: ""
    }
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
        // console.log(data)
        this.setState({ day: data })
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  submitHandle = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/days/${this.dayId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        completed: !this.state.day.completed,
        feelings: this.state.day.feelings
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

  onChangeHandle = e => {
    let dayvar = this.state.day
    dayvar.feelings = e.target.value
    this.setState({
      day: dayvar
    })
  }

 // TODO!! 
//   getDaySkills = () => {
//     console.log("getDaySkills")

//     return this.state.day.dayskills.map(ds => {
//       let theSkill = this.state.day.skills.find(s => (s.id = ds.id))
//       ds.skill_name = theSkill.name
//       ds.actual_time = theSkill.actual_time
//       console.log(ds)
//       return (
//         <>
//           <div>
//             <h3>Skill name: {ds.skill_name}</h3>
//             <h5>Actual time: {ds.actual_time}</h5>
//           </div>
//         </>
//       )
//     })
//   }

  render() {
    if (!this.state.day.id) {
      return null
    }
    return (
      <>
        <div className="page-title">
          <h1 className="signup-title">
            {this.state.day.name}
          </h1>
          <form onSubmit={this.submitHandle}>
            <textarea
              onChange={this.onChangeHandle}
              rows="10"
              name="Feelings"
              value={this.state.day.feelings || ""}
              placeholder="Write your feelings!"
            />
            <br />
            <button className="button fancy-button" type="submit">CLOCK OUT!</button>
          </form>
        </div>

        {/* <div className="day-dayskills">{this.getDaySkills()}</div> */}

        <Link className="button" to={"/mainpage"}>
          Back
        </Link>
      </>
    )
  }
}

export default withRouter(DayInfo)
