import React from "react"

class SkillSelect extends React.Component {
  state = {}
  render() {
    return (
        <>
         <form className="skillform">
         <h3>Enter a Skill:</h3>
            <input className="skillinput" type="text" placeholder="SKILL"/>
          <h3>Hours Daily:</h3>
          <select className="hourselect">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <br/>
          <button className="skillsubmit" type="submit">Submit</button>
         </form>  
        </>      
        )
  }
}

export default SkillSelect
