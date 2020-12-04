import React from 'react'
import { Card } from 'semantic-ui-react'


export defalut function MyRestaurantsList(props) {
  const restaurants = props.restaurants.map(restaurant => {
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
          <Card.Description>{restaurant.rating}</Card.Description>
          <Card.Description>{restaurant.heat_lamps}</Card.Description>
        </Card.Content>
      </Card>
    )
  }

  return(
    <Card.Group centered={true}>
      {restaurantsToDisplay}
    </Card.Group>
  )
}
