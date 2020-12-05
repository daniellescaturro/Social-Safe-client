import React, { Component } from 'react'
import HomeList from '../HomeList'

export default class HomeContainer extends Component {
  constructor(props) {
    super(props)

      this.state = {
        restaurants: [],
        favorites: {},
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

    try {
        let url = process.env.REACT_APP_API_URL + "/api/v1/favorites/myfavorites"
        let res = await fetch(url, {
          method: 'GET', //this commented out in dev-resources
          // mode: "no-cors",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let resJson = await res.json()
        let favs = {}
        resJson.data.forEach((item, i) => {
          console.log("item",item)
          favs[item['restaurant_id']['id']] = item;
        });
        this.setState({favorites: favs})

    }catch(err){
      console.log("ERR", err)
    }
  }

    componentDidMount() {
      this.getRestaurants()
  }


  render() {
    return (
      <div className="HomeContainer">
        <HomeList restaurants={this.state.restaurants} favorites={this.state.favorites} />
    </div>
   )
  }
}
