import React, { Component } from 'react';
import SkillCard from "./SkillCard"

class DayCard extends Component {
    state = {  }

    skillsMapped = () => {
        return this.props.day.skills.map(skill => <SkillCard key={skill.id} skill={skill}/>)
    }



    render() { 
        return ( 
            <>
                <div className="skilldiv ">
                    <h3 className="days">{this.props.day.name}</h3>
                    {this.skillsMapped()}
                </div>
            </>
         );
    }
}
 
export default DayCard;