import React, { Component } from 'react'
import MyRestaurantsList from '../MyRestaurantsList'
import EditRestaurantModal from '../EditRestaurantModal'

export default class MyRestaurantsContainer extends Component {

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


  deleteRestaurant = async (idOfRestaurantToDelete) => {
     try {
       const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + idOfRestaurantToDelete

       const deleteRestaurantResponse = await fetch(url, {
         method: 'DELETE',
         credentials: 'include'
       })

       const deleteRestaurantJson = await deleteRestaurantResponse.json()
       console.log("deleteRestaurantJson", deleteRestaurantJson)

       if(deleteRestaurantResponse.status === 200) {
         this.setState({
           restaurants: this.state.restaurants.filter(restaurant => restaurant.id !== idOfRestaurantToDelete)
         })
       }
     } catch(err) {
       console.log("Error deleting restaurant: ", err)
     }
   }


  editRestaurant = (idOfRestaurantToEdit) => {
    console.log("you are trying to edit restaurant with id: ", idOfRestaurantToEdit)

    this.setState({
      idOfRestaurantToEdit: idOfRestaurantToEdit
    })
  }

  updateRestaurant = async (updatedRestaurantInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + this.state.idOfRestaurantToEdit

      const updateRestaurantResponse = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(updatedRestaurantInfo),
        //mode: 'no-cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'

        }
      })

      console.log("updateRestaurantResponse", updateRestaurantResponse)
      const updateRestaurantJson = await updateRestaurantResponse.json()
      console.log("updateRestaurantJson", updateRestaurantJson)

      if(updateRestaurantResponse.status == 200) {
        const restaurants = this.state.restaurants
        const indexOfRestaurantBeingUpdated = restaurants.findIndex(restaurant => restaurant.id == this.state.idOfRestaurantToEdit)
        restaurants[indexOfRestaurantBeingUpdated] = updateRestaurantJson.data
        this.setState({
          restaurants: restaurants,
          idOfRestaurantToEdit: -1
        })
      }

    } catch(err) {
      console.log("Error updating  info: ", err)
    }
  }

  closeModal = () => {
   this.setState({
     idOfRestaurantToEdit: -1
   })
 }


  render() {
    return (
      <div className="myRestaurantsContainer">
        <MyRestaurantsList restaurants={this.state.restaurants} editRestaurant={this.editRestaurant} />

      {
        this.state.idOfRestaurantToEdit !== -1
        &&
        <EditRestaurantModal
          restaurantToEdit={this.state.restaurants.find((restaurant) => restaurant.id === this.state.idOfRestaurantToEdit).restaurant_id}
          updateRestaurant={this.updateRestaurant}
          closeModal={this.closeModal}
        />
      }
      </div>
    )
  }


}
