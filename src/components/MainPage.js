import React from "react"
import { Link, withRouter } from "react-router-dom"
import DayCard from "./DayCard"

class MainPage extends React.Component {
  state = {
    days: []
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.getDays(this.props.user.id)
    }
  }

  // ------------------FETCHES USERS DAYS---------------------------

  getDays = userId => {
    fetch(`http://localhost:3000/api/v1/users/${userId}/days`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}` //<---Tells server who we are.
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } //<-------Checks if res.ok (status code 200). IF NOT throw new Error.
        throw new Error("Can't get days.", res)
      })
      .then(data => {
        this.setState({
          days: data //<-----Getting all the days and setting in state
        })
      })
  }

  // -----------------------------------------------------------------

  componentDidUpdate(prevProps) {
    // console.log("didUpdate",prevProps,this.props)
    if (this.props.user.id !== prevProps.user.id) {
      //<-----checkes if previous prop.user.id is the same as new props.user.id
      this.getDays(this.props.user.id) //<--- Doing this so that we don't call this.getDays without a user id.
    }
  }

  // -----------------------------------------------------------------

  daysMapped = () => {
    return this.state.days.map(day => <DayCard key={day.id} day={day} />)
  }

  render() {
    if (!this.props.user.id) {
      return null
    }
    return (
      <div>
        <div className="page-title">
          <h3 className="skillform-titles your-daily">
            YOUR DAILY ROUTINES
          </h3>
          <Link className="button add-routine-button" to={"/skillselect"}>
            ADD ROUTINE
          </Link>
        </div>

        <div className="days-container">{this.daysMapped()}</div>
      </div>
    )
  }
}

export default withRouter(MainPage)
