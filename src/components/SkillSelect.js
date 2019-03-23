import React from "react"
import Skillform from "./Skillform"
import Routine from "./Routine"
import SkillList from "./SkillList"

class SkillSelect extends React.Component {
  state = {
    skills: []
  }

  updateSkills = (skill) => {
    this.setState({
      skills: [...this.state.skills, skill]
    })
  }

  getSkillsData = () => {
    fetch(`http://localhost:3000/api/v1/skills`, {
      // fetch(`http://localhost:3000/api/v1/user/${this.props.user.id}/skills`, {
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
    console.log("USER", this.props.user)
    if (this.props.user.id) {
      this.getSkillsData()
    }
  }
  
  componentDidUpdate(prevProps) {
    console.log("didupdate", prevProps)
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
        <Skillform user={this.props.user} updateSkills={this.updateSkills} />
        <SkillList skills={this.state.skills} />
        <Routine />
      </>
    )
  }
}

export default SkillSelect
