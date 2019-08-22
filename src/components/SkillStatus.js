import React from "react"

// CHILD OF DayInfo
class SkillStatus extends React.Component {
  state = {
    completed: false
  }

  componentDidMount() {
    if (this.props.ds.completed) {
      this.setState({
        completed: true
      })
    }
  }
  onChangeHandle = e => {
    this.setState(
      {
        completed: e.target.checked
      },
      () => {
        fetch(
          `https://habitrack-backend.herokuapp.com/api/v1/dayskills/${
            this.props.ds.id
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer: ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
              completed: this.state.completed
            })
          }
        )
          .then(res => {
            if (!res.ok) {
              throw Error("error...", res.statusText)
            } else {
              return res.json()
            }
          })

          .then(data => {
            console.log(data)
          })
      }
    )
  }

  render() {
    console.log("STUFF", this.props.ds)
    return (
      <div className="skill-status">
        <div className="form-check">
          {/* ------------COMPLETED CHECKBOX--------- */}
          <label>
            <input
              type="checkbox"
              value={this.state.completed}
              checked={this.state.completed}
              onChange={this.onChangeHandle}
            />
            <span className="skill-completed-word"> Completed</span>{" "}
            {!this.state.completed}
            <span className="skilllist-end">{this.props.ds.skill_name}</span>
            {/* <h5>Difficulty: {this.props.ds.hard ? "HARD" : "EASY"} </h5> */}
          </label>
        </div>
      </div>
    )
  }
}

export default SkillStatus
