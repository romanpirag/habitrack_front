import React from "react"
import Skillform from "./Skillform"
import Routine from "./Routine"
import SkillList from "./SkillList"

class SkillSelect extends React.Component {
  state = {
    skills: []
  }

  updateSkills = skill => {
    this.setState({
      skills: [...this.state.skills, skill]
    })
  }

  getSkillsData = () => {
    fetch(`https://habitrack-backend.herokuapp.com/api/v1/skills`, {
      // fetch(`https://habitrack-backend.herokuapp.com/api/v1/user/${this.props.user.id}/skills`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => res.json())
      .then(skills => this.setState({ skills }))
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.getSkillsData()
    }
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.user.id !== prevProps.user.id) {
      this.getSkillsData()
    }
  }

  render() {
    if (!this.props.user.id) {
      return null
    }
    return (
      <>
        <div className="page-title">
          <h3 className="your-daily-habits">Choose your Daily Habits</h3>
        </div>
        <div className="skillselect-container">
          <div>
            <Skillform
              user={this.props.user}
              updateSkills={this.updateSkills}
            />
          </div>
          <div className="skillselect-flexchild">
            <SkillList skills={this.state.skills} />
            <Routine />
          </div>
        </div>
      </>
    )
  }
}

export default SkillSelect
