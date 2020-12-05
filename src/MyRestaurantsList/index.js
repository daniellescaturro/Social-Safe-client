import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'


export default function MyRestaurantsList(props) {
  const restaurants = props.restaurants.map(fav => {
    let restaurant = fav.restaurant_id
    return (
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
          <Card.Description>Rating {restaurant.rating}</Card.Description>
          <Card.Description>{restaurant.heat_lamps}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={()=> props.editRestaurant(restaurant.id)}>
            Edit
          </Button>
          <Button
            onClick={()=>props.deleteRestaurant(restaurant.id)}>
            Delete
          </Button>
        </Card.Content>
        <Card.Content extra>
          <Button icon>
            <Icon name='heart' />
          </Button>
          <Button>Review</Button>
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
