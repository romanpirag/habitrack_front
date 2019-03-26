import React from "react"


class SkillList extends React.Component {
    state = {}

    mappedSkills = () => {
        return this.props.skills ? this.props.skills.map(skill => 
            <div className="skilllist-div">
           <h4 className="skilllist" key={skill.id}>⭕️ {skill.name} <span className="target">Target: {skill.target}hrs</span> </h4>
            </div>
        ) : null
    }


    render() {
        if (!this.props.skills) {
            return null
        }

        return (
          <div>
            <div className="skilldiv2">
                    <h3 className="your-daily-routine">YOUR DAILY ROUTINE</h3>
            </div>
            <br/>>
            <div className="skilldiv2">
                <div className="yourskills">{this.mappedSkills()}</div>
            </div>
          </div>
        )
    }
}

export default SkillList