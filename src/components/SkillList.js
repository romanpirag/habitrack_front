import React from "react"


class SkillList extends React.Component {
    state = {}

    mappedSkills = () => {
        console.log(this.props)
       return this.props.skills.map(skill => 
           <h4 key={skill.id}>{skill.name} <span className="target">Target: {skill.target}</span> </h4>
        )
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
                <h5 className="yourskills">{this.mappedSkills()}</h5>
            </div>
          </div>
        )
    }
}

export default SkillList