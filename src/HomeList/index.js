import React, { useState, useEffect, Component} from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import '../index.css'

const RenderRestaurant = ({restaurant, favorite}) => {


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
          // update favorite state
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
  return(
    <Card key={restaurant.id}>
      <Image centered={true} className="restaurantImage" src={restaurant.image_url} />
      <Card.Content>
        <Card.Header>
          <a href={restaurant.url}>{restaurant.name}</a>
        </Card.Header>
        <Card.Meta>{restaurant.title}</Card.Meta>
        <Card.Meta>{restaurant.address1}</Card.Meta>
        <Card.Meta>{restaurant.city}</Card.Meta>
        <Card.Meta>{restaurant.state}</Card.Meta>
        <Card.Meta>{restaurant.zip_code}</Card.Meta>
        <Card.Description><Card.Meta>Rating: {restaurant.rating}</Card.Meta></Card.Description>
        <Card.Description>{restaurant.heat_lamps}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={()=> { handleClick()}} icon>
          { isFavorite ? <Icon name='heart' /> : <Icon name='heart outline' /> }
        </Button>
        <Button>Review</Button>
      </Card.Content>
    </Card>
  )
}



export default function HomeList(props) {

  const restaurantsToDisplay = props.restaurants.map(restaurant => {
    return <RenderRestaurant restaurant={restaurant} favorite={props.favorites[restaurant.id]} key={restaurant.id}/>
  })
  return(
    <Card.Group centered={true}>
      {restaurantsToDisplay}
    </Card.Group>
  )

}
