import React from 'react';



class Skillform extends React.Component {
    state = {  }


    render() { 
        return (  
            <div>
        <form className="skillform" onSubmit={this.handleSubmit}>
            <div className="skilldiv">
                <h3 className="skillform-titles">Enter a Skill:</h3>
            </div>
                <input className="skillinput" type="text" placeholder="SKILL" />
            <div className="skilldiv">
                <h3 className="skillform-titles" >Target Hours Daily:</h3>
            </div>
            <div className="numarrows">
            <input type="number" className="hourselect" min="0" max="24" placeholder="0"/>
            </div>
            <br />
            <button className="skillsubmit" type="submit">
            ADD
            </button>
                </form>
        </div>
        );
    }
}

export default Skillform