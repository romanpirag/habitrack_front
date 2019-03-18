import React from "react"

class MainPage extends React.Component {
  state = {}

  getDays = userId => {

    fetch(`http://localhost:3000/api/v1/users/${userId}/days`, {
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
        throw new Error("Can't get days.", res)
      })
      .then(data => {
        console.log(data)
      })
    
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/profile", {
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
          console.log('profile', data)
        this.getDays(data.user.id) // user id??
      })
      .catch(e => {
        console.log("Oh noes")
          this.props.history.push("/login")
      })
  }

  render() {
    return <h1>Main Habitary Page</h1>
  }
}

export default MainPage
