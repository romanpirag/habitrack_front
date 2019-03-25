import React from "react"

class Skillform extends React.Component {
  defaultState = {
    skillValue: "",
    targetValue: 0
  }
  state = this.defaultState

  handleInputChange = e => {
    const inputName = e.target.name

    this.setState({
      [inputName]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        name: this.state.skillValue,
        target: this.state.targetValue
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
          <div className="numarrows">
            <input
              onChange={this.handleInputChange}
              type="number"
              name="targetValue"
              className="hourselect"
              min="0"
              max="24"
              placeholder="0"
              value={this.state.targetValue}
            />
          </div>
          <br />
          <button className="button fancy-button skillsubmit" type="submit">
            ADD
          </button>
        </form>
      </div>
    )
  }
}

export default Skillform
