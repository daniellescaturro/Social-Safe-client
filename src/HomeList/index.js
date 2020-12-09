import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import '../index.css'

const RenderRestaurant = ({
                          restaurant,
                          favorite,
                          editRestaurant,
                          deleteRestaurant,
                          reviewRestaurant
                        }) => {
  let f = false
  if(favorite !== undefined) {
      f = favorite.favorite

  }
  const [isFavorite, setFavorite] = useState(f);
  useEffect(()=> { setFavorite(f) }, [f])
  const handleClick = async () => {

    try {
      if(favorite !== undefined){
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

        const updateJson = await updateResponse.json()
      }else{
        if(restaurant.id !== undefined){
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

          const updateJson = await updateResponse.json()
        }else {
          const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/-1"
          const updatedFavoriteInfo = { favorite: !isFavorite }
          const data = {
            restaurant: restaurant,
            favorite: !isFavorite
          }
          const updateResponse = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const updateJson = await updateResponse.json()
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

  const  calculateAvgSS = (reviews) => {
    let total = 0
    reviews.forEach((item, i) => {
        total += item.rating
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
        <p className="restaurantCategory">{restaurant.title}</p>
        <Card.Meta>{restaurant.address1}</Card.Meta>
        <Card.Meta className="address">{restaurant.city}, {restaurant.state} {restaurant.zip_code}</Card.Meta>
        <p className="cardDetail"> Yelp Rating: {restaurant.rating}</p>
        <p className="cardDetail">Social Safe Rating: {restaurant.reviews.length===0 ? "Not yet rated" : calculateAvgSS(restaurant.reviews) }</p>
        <p className="cardDetail">Social Distance Rating: {restaurant.reviews.length===0 ? "Not yet rated" : calculateAvg(restaurant.reviews) }</p>
        <p className="cardDetail">Heat Lamps: {restaurant.heat_lamps===true?'Yes':'No'}</p>
        {
          (restaurant.id !== undefined)
          ?
          <Link to={`/restaurants/${restaurant.id}`}>[See Details]</Link>
          :
          ''
        }
      </Card.Content>

      {
        (restaurant.id !== undefined && JSON.parse(localStorage.getItem('userData')).id === restaurant.uploader.id)
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
        <Button color='brown' onClick={() => reviewRestaurant(restaurant)}>Review</Button>
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
