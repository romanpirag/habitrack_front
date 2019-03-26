import React, { Component } from 'react';


class SkillCard extends Component {
    state = {  }
    render() { 
        return (
          <>
            <h2 className="singleskill">
              {this.props.skill.name}
              <span className="skilltarget">
                {" "}
                Target: {this.props.skill.target}hrs
              </span>
            </h2>
          </>
        )
    }
}
 
export default SkillCard;