import React, { Component } from 'react'
import HomeList from '../HomeList'
import { Card, Image } from 'semantic-ui-react'

export default class HomeContainer extends Component {
  constructor(props) {
    super(props)

      this.state = {
        restaurants: [],
        action: ''
      }
    }

    setActionState = (action) => {
      this.setState({
        action: action
      })
    }

    getRestaurants = async () => {
      try {

        console.log("the env", process.env.REACT_APP_API_URL)
        const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/"
        console.log("about to fetch data from:")
        console.log(url)
        const restaurantsResponse = await fetch(url, {
        method: 'GET', //this commented out in dev-resources
        // mode: "no-cors",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        } //headers commented out in dev-resources
      })
      console.log(restaurantsResponse)
      const restaurantsJson = await restaurantsResponse.json()
      console.log(restaurantsJson)

    if(restaurantsResponse.status == 200 || restaurantsResponse.status == 201 ) {
     this.setState({
       restaurants: restaurantsJson.data
      })
    }
    } catch(err) {
      console.log("Error getting items data.", err);
    }
  }

    componentDidMount() {
      this.getRestaurants()
  }


  render() {
    return (
      <div className="HomeContainer">
        <HomeList restaurants={this.state.restaurants} />
    </div>
   )
  }
}
