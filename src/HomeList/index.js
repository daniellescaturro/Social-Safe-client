import React, { useState, useEffect, Component} from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Icon, Grid, Header, Segment } from 'semantic-ui-react'
import '../index.css'

const RenderRestaurant = ({
                          restaurant,
                          favorite,
                          editRestaurant,
                          deleteRestaurant,
                          reviewRestaurant
                        }) => {
  let f = false
  if(favorite != undefined) {
      f = favorite.favorite

  }
  const [isFavorite, setFavorite] = useState(f);
  useEffect(()=> { setFavorite(f) }, [f])
  const handleClick = async () => {

    try {
      if(favorite != undefined){
        const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + favorite.id
        const updatedFavoriteInfo = {favorite: !isFavorite}
        const updateResponse = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(updatedFavoriteInfo),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log("updateResponse", updateResponse)
        const updateJson = await updateResponse.json()
        console.log("updateJson", updateJson)

        if(updateResponse.status == 200) {
        }
      }else{
        const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + restaurant.id
        const updatedFavoriteInfo = { favorite: !isFavorite }
        const updateResponse = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(updatedFavoriteInfo),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log("updateResponse", updateResponse)
        const updateJson = await updateResponse.json()
        console.log("updateJson", updateJson)

        if(updateResponse.status == 200) {
          // update favorite state
        }
      }
      setFavorite(!isFavorite)

    } catch(err) {
      console.log("Error updating  info: ", err)
    }

  }
  const  calculateAvg = (reviews) => {
    let total = 0
    reviews.forEach((item, i) => {
        total += item.social_distancing_rating
    });
    return total / reviews.length

  }

  return(
    <Card color='brown' key={restaurant.id}>
      <Image centered={true} className="restaurantImage" src={restaurant.image_url} />
      <Card.Content center={true}>
        <Card.Header>
          <a href={restaurant.url}>{restaurant.name}</a>
        </Card.Header>
        <Card.Meta>{restaurant.title}</Card.Meta>
        <Card.Meta>{restaurant.address1}</Card.Meta>
        <Card.Meta>{restaurant.city}, {restaurant.state} {restaurant.zip_code}</Card.Meta>
        <Card.Meta> Yelp Rating: {restaurant.rating}</Card.Meta>
        <Card.Meta>Social Distance Rating: {restaurant.reviews.length==0 ? "Not yet rated" : calculateAvg(restaurant.reviews) }</Card.Meta>
        <Card.Meta>Heat Lamps: {restaurant.heat_lamps==true?'Yes':'No'}</Card.Meta>
        <Link to={`/restaurants/${restaurant.id}`}>See details</Link>
      </Card.Content>
      {
        JSON.parse(localStorage.getItem('userData')).id == restaurant.uploader.id
        ?
        <Card.Content extra>
          <Button
            basic color='brown' onClick={()=> editRestaurant(restaurant.id)}>
            Edit
          </Button>
          <Button
            basic color='brown'
            onClick={()=> deleteRestaurant(restaurant.id)}>
            Delete
          </Button>
        </Card.Content>
        :
        ''
      }
      <Card.Content extra>
        <Button onClick={()=> { handleClick()}} icon>
          { isFavorite ? <Icon name='heart' color='pink' /> : <Icon name='heart outline' color='pink' /> }
        </Button>
        <Button color='brown' onClick={() => reviewRestaurant(restaurant.id)}>Review</Button>
      </Card.Content>
    </Card>

  )
}

export default function HomeList(props) {

  const restaurantsToDisplay = props.restaurants.map(restaurant => {
    return <RenderRestaurant
              restaurant={restaurant}
              favorite={props.favorites[restaurant.id]}
              key={restaurant.id}
              deleteRestaurant={props.deleteRestaurant}
              editRestaurant={props.editRestaurant}
              reviewRestaurant={props.reviewRestaurant}
              />
  })
  return(
    <Card.Group centered={true}>
      {restaurantsToDisplay}
    </Card.Group>
  )

}
