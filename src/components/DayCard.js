import React, { Component } from 'react';
import SkillCard from "./SkillCard"
import { withRouter } from "react-router-dom"

class DayCard extends Component {
    state = {  }

    skillsMapped = () => {
        return this.props.day.skills.map(skill => <SkillCard key={skill.id} skill={skill}/>)
    }

    clickHandle = () => {
        this.props.history.push(`/day/${this.props.day.id}`)
    }

    render() {
        if (this.props.day.completed) {
            return (
                <>
                    <div onClick={this.clickHandle} className="skilldiv">
                       <h1>DONE</h1>
                    </div>
                </>
            );
        }
        return ( 
            <>
                <div onClick={this.clickHandle} className="skilldiv">
                    <h3 className="days">{this.props.day.name}</h3>
                    <div className="day-skills">
                        {this.skillsMapped()}
                    </div>
                </div>
            </>
         );
    }
}
 
export default withRouter(DayCard);