import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import '../index.css'

export default function MyRestaurantsList(props) {
  const restaurants = props.restaurants.map(fav => {
    let restaurant = fav.restaurant_id
    return (
      <Card color='brown' key={restaurant.id}>
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
          <Card.Meta>Rating: {restaurant.rating}</Card.Meta>
          <Card.Meta>Heat Lamps: {restaurant.heat_lamps == true ? 'yes': 'No'}</Card.Meta>
        </Card.Content>
        {
          JSON.parse(localStorage.getItem('userData')).id == restaurant.uploader.id
          ?
          <Card.Content extra>
            <Button
              basic color='brown' onClick={()=> props.editRestaurant(fav.id)}>
              Edit
            </Button>
            <Button
              basic color='brown'
              onClick={()=> props.deleteRestaurant(restaurant.id)}>
              Delete
            </Button>
          </Card.Content>
          :
          ''
        }

        <Card.Content extra>
          <Button icon>
            <Icon name='heart' color='pink' />
          </Button>
          <Button color='brown'>Review</Button>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={true}>
      {restaurants}
    </Card.Group>
  )
}
