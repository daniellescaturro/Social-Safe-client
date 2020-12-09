import React, { Component } from 'react'
import MyRestaurantsList from '../MyRestaurantsList'
import EditRestaurantModal from '../EditRestaurantModal'
import ReviewModal from '../ReviewModal'
import { Header } from 'semantic-ui-react'

export default class MyRestaurantsContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      idOfRestaurantToEdit: -1,
      idOfRestaurantToReview: -1,
      restaurantToReview: {},
      action: '',
    }
  }

  setActionState = (action) => {
    this.setState({
      action: action
    })
  }

  componentDidMount() {
    this.getRestaurants()
  }

  removeFavorite = (fav) =>{
    let temp = this.state.restaurants.filter(res=>res.id !== fav.id)
    this.setState({
      restaurants: temp
    })
  }

  getRestaurants = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/myfavorites"
      const restaurantsResponse = await fetch(url, {
        credentials: 'include',
      })

      const restaurantsJson = await restaurantsResponse.json()
      console.log(restaurantsJson)

    if(restaurantsResponse.status === 200 || restaurantsResponse.status === 201 ) {
      this.setState({
        restaurants: restaurantsJson.data
      })
    }
    } catch(err) {
        console.log("There was an error getting the item's data. Please try again.", err)
    }
  }


  deleteRestaurant = async (idOfRestaurantToDelete) => {
     try {
       const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + idOfRestaurantToDelete

       const deleteRestaurantResponse = await fetch(url, {
         method: 'DELETE',
         credentials: 'include'
       })

       const deleteRestaurantJson = await deleteRestaurantResponse.json()

       if(deleteRestaurantResponse.status === 200) {
         this.setState({
           restaurants: this.state.restaurants.filter(restaurant => restaurant.restaurant_id.id !== idOfRestaurantToDelete)
         })
       }
     } catch(err) {
       console.log("Error deleting restaurant: ", err)
     }
   }


  editRestaurant = (idOfRestaurantToEdit) => {

    this.setState({
      idOfRestaurantToEdit: idOfRestaurantToEdit
    })
  }

  reviewRestaurant = (restaurantToReview) => {
    this.setState({
      idOfRestaurantToReview: restaurantToReview.id,
      restaurantToReview: restaurantToReview
    })
  }

  updateRestaurant = async (updatedRestaurantInfo) => {
    try {
      let id = this.state.restaurants.find((restaurant) => restaurant.id === this.state.idOfRestaurantToEdit).restaurant_id.id
      const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + id

      const updateRestaurantResponse = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(updatedRestaurantInfo),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const updateRestaurantJson = await updateRestaurantResponse.json()

      if(updateRestaurantResponse.status === 200) {
        const restaurants = this.state.restaurants
        const indexOfRestaurantBeingUpdated = restaurants.findIndex(restaurant => restaurant.id === this.state.idOfRestaurantToEdit)
        restaurants[indexOfRestaurantBeingUpdated].restaurant_id =  updateRestaurantJson.data
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

 closeReviewModal = () => {
   this.setState({
     idOfRestaurantToReview: -1
   })
 }


  render() {
    return (
      <React.Fragment>
        <Header as='h2' className="listHeaders">My Favorites</Header>
      <div className="myRestaurantsContainer">
        <MyRestaurantsList
          restaurants={this.state.restaurants}
          editRestaurant={this.editRestaurant}
          removeFavorite={this.removeFavorite}
          deleteRestaurant={this.deleteRestaurant}
          reviewRestaurant={this.reviewRestaurant}
          />

      {
        this.state.idOfRestaurantToEdit !== -1
        &&
        <EditRestaurantModal
          restaurantToEdit={this.state.restaurants.find((restaurant) => restaurant.id === this.state.idOfRestaurantToEdit).restaurant_id}
          updateRestaurant={this.updateRestaurant}
          closeModal={this.closeModal}
        />
      }

      {
        this.state.idOfRestaurantToReview !== -1
        &&
        <ReviewModal
          restaurantToReview={this.state.restaurantToReview}
          closeModal={this.closeReviewModal}
          idOfRestaurantToReview={this.state.idOfRestaurantToReview}
        />
      }

      </div>
      </React.Fragment>
    )
  }

}
