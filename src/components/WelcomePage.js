import React from "react"

class WelcomePage extends React.Component {
  state = {}

  componentDidMount() {
    fetch("https://habitrack-api.herokuapp.com/api/v1/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => {
        console.log(res)
        if (res.ok) {
          return res.json()
        }
        throw new Error("Not logged in...", res)
      })
      .then(data => {
        this.props.history.push("/mainpage")
        console.log("hello", data)
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  render() {
    return (
      <>
        <h1>LogIn</h1>
        <h1>SignUp</h1>
      </>
    )
  }
}

export default WelcomePage
