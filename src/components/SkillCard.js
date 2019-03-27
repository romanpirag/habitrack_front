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
              <span>
                {" "}
                {this.props.skill.hard ? (
                  <span className="hardsmash">HARD</span>
                ) : (
                  <span className="easysmash">EASY</span>
                )}
              </span>
            </h2>
          </>
        )
    }
}
 
export default SkillCard;