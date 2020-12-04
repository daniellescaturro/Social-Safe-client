import React, { Component } from 'react'
import MyRestaurantsList from '../MyRestaurantsList'

export default MyRestaurantsContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      idOfRestaurantToEdit: -1,
      action: ''
    }
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/myfavorites"
      const restaurantsResponse = await fetch(url, {
        credentials: 'include',
      })

      const restaurantsJson = await restaurantsResponse.json()
      console.log(restaurantsJson)

      this.setState({
        restaurants: restaurantsJson.data
      })
    } catch(err) {
        console.log("There was an error getting the item's data. Please try again.", err)
    }
  }


  render() {
    return (
      <div className="myRestaurantsContainer">
        <MyRestaurantsList />
      </div>
    )
  }


}
