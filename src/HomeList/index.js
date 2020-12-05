import React, { useState, Component} from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import '../index.css'

const RenderRestaurant = ({restaurant, favorite}) => {

  let f = false
  if(favorite != undefined){
    f = favorite.favorite;
  }
  console.log('f', f)
  const [isFavorite, setFavorite] = useState(f);
  const clickHandle = () => {
    setFavorite(!isFavorite);

    // make a post/put to update the favorite
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
        <Button onClick={()=> clickHandle()} icon>
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
