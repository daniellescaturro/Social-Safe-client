import React, { Component } from 'react'
import { Header, Image, Card, Container } from 'semantic-ui-react'
import '../index.css'

export default class RestaurantDetail extends Component {
  constructor(props){
      super(props)
      console.log(props.match.params.restaurant_id)

      this.state = {
        restaurant: {
          reviews: []
        },
        restaurant_id: props.match.params.restaurant_id,
        avgReview: 0,
        avgSocDistReview: 0,
      }
  }

    //fetching by restaurant_id
  getRestaurant = async () => {
      try {
        console.log("the env", process.env.REACT_APP_API_URL)

        const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + this.state.restaurant_id
        console.log("about to fetch data from:")
        console.log(url)
        const restaurantResponse = await fetch(url, {
        method: 'GET',
        // mode: "no-cors",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(restaurantResponse)
      const restaurantJson = await restaurantResponse.json()
      console.log(restaurantJson)

      if(restaurantResponse.status == 200 || restaurantResponse.status == 201) {
        this.setState({
       restaurant: restaurantJson.data
      })
      }
    } catch(err) {
      console.log("Error getting items data.", err);
    }
  }

    //component didMount
  componentDidMount() {
      this.getRestaurant()
  }


  //something wrong with syntax above or with these calcs, but can't find it
  calculateAvgReview = (reviews) => {
      let total = 0
      reviews.forEach((item, i) => {
          total += item.rating
      });
      return total / reviews.length
    }

  calculateAvgSocDistReview = (reviews) => {
      let total = 0
      reviews.forEach((item, i) => {
          total += item.social_distancing_rating
      });
      return total / reviews.length
    }

//want to render static and nonstatic info, how to do that? do i need another component?

//throws restaurant_id undefined
    render() {
      return (
        <Container textAlign={"center"}>
          <Image src={this.state.restaurant.image_url} />
          <Header as='h2'><a href={this.state.restaurant.url}>{this.state.restaurant.name}</a></Header>
          <p>{this.state.restaurant.title}</p>
          <p>{this.state.restaurant.address1}</p>
          <p>{this.state.restaurant.city}, {this.state.restaurant.state} {this.state.restaurant.zip_code}</p>
          <p>Yelp rating: {this.state.restaurant.rating}</p>

          <p>Heat Lamps: {this.state.restaurant.heat_lamps==true?'Yes':'No'}</p>
          <Reviews reviews={this.state.restaurant.reviews}/>
        </Container>
      )
    }

  }

const Reviews = ({reviews}) => {
    const reviewsList = reviews.map(review => (
    <div>
      <React.Fragment>
        <Header as='h4'>Reviews</Header>
      </React.Fragment>
      <Card.Group>
        <Card fluid>
            <Card.Content>
              <p>Social Safe Rating: {review.rating}</p>
              <p>Social Distance Rating: {review.social_distancing_rating}</p>
              <p>Comments: {review.comments}</p>
            </Card.Content>
        </Card>
      </Card.Group>
    </div>))
    return (
      <div>
        {reviewsList}
      </div>
    )

  }

//this is the nonstatic info want to render. another component?
