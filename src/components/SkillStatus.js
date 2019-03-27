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
        fetch(`http://localhost:3000/api/v1/dayskills/${this.props.ds.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer: ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            completed: this.state.completed
          })
        })
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
            <span className="skilllist-end">{this.props.ds.skill_name}</span>
        {/* <h5>Difficulty: {this.props.ds.hard ? "HARD" : "EASY"} </h5> */}
            <input
              className="happycheck"
              type="checkbox"
              value={this.state.completed}
              checked={this.state.completed}
              onChange={this.onChangeHandle}
            />
            Completed {!this.state.completed}
          </label>
        </div>
      </div>
    )
  }
}

export default SkillStatus
