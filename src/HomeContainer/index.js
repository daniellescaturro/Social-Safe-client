import React, { Component, useState } from 'react'
import HomeList from '../HomeList'
import EditRestaurantModal from '../EditRestaurantModal' //added
import ReviewModal from '../ReviewModal'
import { Header, Search, Grid, Label} from 'semantic-ui-react'

//original code before adds, except where noted.
export default class HomeContainer extends Component {
  constructor(props) {
    super(props)

      this.state = {
        restaurants: [],
        favorites: {},
        idOfRestaurantToEdit: -1,
        idOfRestaurantToReview: -1,
        restaurantToReview: {},
        action: '',
        searchResult: []
      }
    }

    setActionState = (action) => {
      this.setState({
        action: action
      })
    }
    setSearchResults = (results) => {
      this.setState({
        searchResult: results
      })
    }
    getRestaurants = async () => {
      try {

        console.log("the env", process.env.REACT_APP_API_URL)
        const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/"
        console.log("about to fetch data from:")
        console.log(url)
        const restaurantsResponse = await fetch(url, {
        method: 'GET',
        // mode: "no-cors",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
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
          method: 'GET',
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




  deleteRestaurant = async (idOfRestaurantToDelete) => {
     try {
       const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + idOfRestaurantToDelete

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

  reviewRestaurant = (restaurantToReview) => {
    this.setState({
      idOfRestaurantToReview: restaurantToReview.id,
      restaurantToReview: restaurantToReview
    })
  }

  updateRestaurant = async (updatedRestaurantInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + this.state.idOfRestaurantToEdit

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
        restaurants[indexOfRestaurantBeingUpdated] =  updateRestaurantJson.data
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
        <CustomSearch setSearchResults={this.setSearchResults}/>
        <HomeList
          restaurants={this.state.searchResult}
          favorites={this.state.favorites}
          editRestaurant={this.editRestaurant}
          deleteRestaurant={this.deleteRestaurant}
          reviewRestaurant={this.reviewRestaurant}
          />
        <Header as='h2' className="listHeaders">See All the Restaurants</Header>
        <div className="HomeContainer">
        <HomeList
          restaurants={this.state.restaurants}
          favorites={this.state.favorites}
          editRestaurant={this.editRestaurant}
          deleteRestaurant={this.deleteRestaurant}
          reviewRestaurant={this.reviewRestaurant}
        />

      {
        this.state.idOfRestaurantToEdit !== -1
        &&
        <EditRestaurantModal
          restaurantToEdit={this.state.restaurants.find((restaurant) => restaurant.id === this.state.idOfRestaurantToEdit)}
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


const CustomSearch = ({ setSearchResults }) => {
  const  [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState("")
  const timeoutRef = React.useRef()

  const resultRenderer = ({ name }) => <Label content={name} />

  const handleSearchChange = React.useCallback((e, data)=>{
    clearTimeout(timeoutRef.current)
    setValue(data.value)
    setLoading(true)
    console.log("data", data.value)
    timeoutRef.current = setTimeout(async()=>{
      // make request
      try {
        console.log('value', value)
        const url = process.env.REACT_APP_API_URL + `/api/v1/restaurants/search?location=${value}`
        const restaurantsResponse = await fetch(url, {
          credentials: 'include',
        })

        const restaurantsJson = await restaurantsResponse.json()
        console.log(restaurantsJson)
        setLoading(false)
        setResults(restaurantsJson.data)
        setSearchResults(restaurantsJson.data)
      } catch(err) {
          console.log("There was an error getting the item's data. Please try again.", err)
      }
      console.log("I should not change as quickly as you type")

    }, 2000)
  }, [value])

  React.useEffect(()=> {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  return(
    <Grid>
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          results={results}
          resultRenderer={resultRenderer}
          onSearchChange={handleSearchChange}
          value={value}
        />
      </Grid.Column>
      <Grid.Column width={5}></Grid.Column>
    </Grid>
  )
}
