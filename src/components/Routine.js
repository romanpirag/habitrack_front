import React from "react"
import { withRouter } from "react-router-dom"

// CHILD OF SkillSelect
class Routine extends React.Component {
  state = {
    dayAmount: 0
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("https://habitrack-api.herokuapp.com/api/v1/dayskills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        daycount: this.state.dayAmount
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
        this.props.history.push("/mainpage")
        window.scrollTo(0, 0)
      })
  }

  handleInputChange = e => {
    this.setState({
      dayAmount: e.target.value
    })
  }

  render() {
    return (
      <>
        <form className="skill-routine-table" onSubmit={this.handleSubmit}>
          */}
          <br />
          <div className="skilldiv2 numdays">
            <h3 className="skillform-titles">Number of Days</h3>
          </div>
          {/* ------------NUMBER OF DAYS SELECTOR--------- */}
          <div className="numarrows">
            <input
              onChange={this.handleInputChange}
              type="number"
              name="targetValue"
              className="hourselect"
              min="0"
              max="100"
              placeholder="0"
              value={this.state.dayAmount}
            />
          </div>
          <button
            className="create-routine button create-routine-button"
            type="submit"
          >
            CREATE ROUTINE
          </button>
        </form>
      </>
    )
  }
}

export default withRouter(Routine)
