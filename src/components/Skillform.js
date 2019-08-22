import React from "react"

// CHILD OF SkillSelect
class Skillform extends React.Component {
  defaultState = {
    skillValue: "",
    targetValue: 1,
    hardValue: false
  }

  state = this.defaultState

  handleInputChange = e => {
    const inputName = e.target.name

    this.setState({
      [inputName]: e.target.value
    })
  }

  hardInputChange = e => {
    console.log("HARDVALUE", this.props.user)
    this.setState({
      hardValue: e.target.checked
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("https://habitrack-backend.herokuapp.com/api/v1/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        name: this.state.skillValue,
        target: this.state.targetValue,
        hard: this.state.hardValue
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
        this.props.updateSkills(data.skill)
        this.setState(this.defaultState)
      })
  }

  render() {
    return (
      <div>
        <form className="skillform" onSubmit={this.handleSubmit}>
          <div className="skilldiv2">
            <h3 className="skillform-titles">Enter a Skill:</h3>
          </div>
          {/* ------------CHOOSE SKILL INPUT--------- */}
          <input
            className="skillinput"
            onChange={this.handleInputChange}
            name="skillValue"
            type="text"
            value={this.state.skillValue}
            placeholder="SKILL"
          />
          <div className="skilldiv2">
            <h3 className="skillform-titles">Target Hours Daily:</h3>
          </div>
          {/* ------------NUMBER TARGET HOURS SELECTOR--------- */}
          <div className="numarrows">
            <input
              onChange={this.handleInputChange}
              type="number"
              name="targetValue"
              className="hourselect"
              min="1"
              max="24"
              placeholder="1"
              value={this.state.targetValue}
            />
          </div>
          <br />
          <div className="skilldiv2">
            <h3 className="skillform-titles">Difficulty</h3>
          </div>
          <div>
            {/* ------------DIFFICULTY CHECKBOX--------- */}
            <label>
              <input
                type="checkbox"
                value={this.state.hardValue}
                checked={this.state.hardValue}
                onChange={this.hardInputChange}
              />
              <span className="hardtitle">HARD</span>
            </label>
          </div>
          <br />
          <button
            className="button fancy-button skillsubmit addbutton"
            type="submit"
          >
            Add Skill
          </button>
        </form>
      </div>
    )
  }
}

export default Skillform
