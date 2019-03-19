import React from "react"

class Routine extends React.Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/dayskills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      }
      // body: JSON.stringify({
      // })
    })
      .then(res => {
        if (!res.ok) {
          throw Error("error...", res.statusText)
        } else {
          return res.json()
        }
      })

      .then(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <>
        <form className="skillform" onSubmit={this.handleSubmit}>
          {/* <h3>Enter a Skill:</h3>
                    <input className="skillinput" type="text" placeholder="SKILL" /> */}
          <br />
          <button className="skillsubmit" type="submit">
            CREATE ROUTINE
          </button>
        </form>
      </>
    )
  }
}

export default Routine
