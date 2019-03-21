import React from "react"


class SkillList extends React.Component {
    state = {}

    mappedSkills = () => {
        return this.props.skills ? this.props.skills.map(skill => 
           <span key={skill.id}>{skill.name} <span className="target">Target: {skill.target}</span> </span>
        ) : null
    }


    render() {
        if (!this.props.skills) {
            return null
        }

        return (
          <div>
            <div className="skilldiv">
                <h3 className="skillform-titles2">YOUR DAILY ROUTINE</h3>
            </div>
            <div className="skilldiv">
                <div className="yourskills">{this.mappedSkills()}</div>
            </div>
          </div>
        )
    }
}

export default SkillList