import React from "react"


class SkillList extends React.Component {
    state = {}

    mappedSkills = () => {
        console.log(this.props)
       return this.props.skills.map(skill => 
           <h4 key={skill.id}>{skill.name}</h4>
        )

    }


    render() {
        if (!this.props.skills) {
            return null
        }

        return (
            <>
            {this.mappedSkills()}
            </>
        )
    }
}

export default SkillList