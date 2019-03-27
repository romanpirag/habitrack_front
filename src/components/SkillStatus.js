import React from "react"

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
    return (
      <div className="skill-status">
        <h3>Skill name: {this.props.ds.skill_name}</h3>
        <h5>Difficulty: {this.props.ds.hard ? "HARD" : "EASY"} </h5>
        COMPLETEDPROPS: {this.props.ds.completed}
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              value={this.state.completed}
              checked={this.state.completed}
              onChange={this.onChangeHandle}
            />
            Completed {!this.state.completed || "(hellyea)"}
          </label>
        </div>
      </div>
    )
  }
}

export default SkillStatus
