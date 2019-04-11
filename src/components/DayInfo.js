import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import SkillStatus from "./SkillStatus"

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
  getDaySkills = () => {
    return this.state.day.dayskills
      .sort((a, b) => a.id - b.id)
      .map(ds => {
        let theSkill = this.state.day.skills.find(s => s.id === ds.skill_id)
        ds.skill_name = theSkill.name
        return <SkillStatus key={ds.id} ds={ds} />
      })
      
  }

  render() {
    if (!this.state.day.id) {
      return null
    }
    return (
      <>
        <div className="page-title">
          <h1 className="dayinfo-all">{this.state.day.name}</h1>
          <div className="skillday-info">
          <div className="day-dayskills">{this.getDaySkills()}</div>
          </div>
          <h1 className="journal-title">Share Your Feeings!</h1>
          <form className="journal-form" onSubmit={this.submitHandle}>
            <textarea
              onChange={this.onChangeHandle}
              rows="10"
              name="Feelings"
              value={this.state.day.feelings || ""}
              placeholder="<---------Type here!"
            />
            <br />
            <button className="button fancy-button daycompleted" type="submit">
              !! PRESS TO FINISH THE DAY !!
            </button>
          </form>
        </div>

     

        {/* <Link className="button" to={"/mainpage"}>
          Back
        </Link> */}
      </>
    )
  }
}

export default withRouter(DayInfo)
