import React, { Component } from 'react'
import { Header, Image, Card, Container } from 'semantic-ui-react'
import '../index.css'

export default class RestaurantDetail extends Component {
  constructor(props){
      super(props)

      this.state = {
        restaurant: {
          reviews: []
        },
        restaurant_id: props.match.params.restaurant_id,
        avgReview: 0,
        avgSocDistReview: 0,
      }
  }


  getRestaurant = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/api/v1/restaurants/" + this.state.restaurant_id
        const restaurantResponse = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const restaurantJson = await restaurantResponse.json()

      if(restaurantResponse.status === 200 || restaurantResponse.status === 201) {
        this.setState({
       restaurant: restaurantJson.data
      })
      }
    } catch(err) {
      console.log("Error getting items data.", err);
    }
  }


  componentDidMount() {
      this.getRestaurant()
  }


  calculateAvgReview = (reviews) => {
    let total = 0
    reviews.forEach((item, i) => {
        total += item.rating
    });
    return Math.round((total / reviews.length) * 10) /10
  }

  calculateAvgSocDistReview = (reviews) => {
    let total = 0
    reviews.forEach((item, i) => {
        total += item.social_distancing_rating
    });
    return Math.round((total / reviews.length) * 10) / 10
  }


  render() {
    return (
      <Container textAlign={"center"}>
        <Image className="restaurantDetailImage" src={this.state.restaurant.image_url} />
        <Header as='h2'><a href={this.state.restaurant.url}>{this.state.restaurant.name}</a></Header>
        <p className="restaurantCategorySP">{this.state.restaurant.title}</p>
        <p className="address1SP">{this.state.restaurant.address1}</p>
        <p className="addressSP">{this.state.restaurant.city}, {this.state.restaurant.state} {this.state.restaurant.zip_code}</p>
        <p className="restaurantDetailSP">Yelp Rating: {this.state.restaurant.rating}</p>
        <p className="restaurantDetailSP">Social Safe Rating: {this.state.restaurant.reviews.length===0 ? "Not yet rated" : this.calculateAvgReview(this.state.restaurant.reviews) }</p>
        <p className="restaurantDetailSP">Social Distance Rating: {this.state.restaurant.reviews.length===0 ? "Not yet rated" : this.calculateAvgSocDistReview(this.state.restaurant.reviews) }</p>

        <React.Fragment>
          <Header as='h3'>Reviews</Header>
        </React.Fragment>

        <Reviews reviews={this.state.restaurant.reviews}/>

      </Container>
    )
  }
}

const Reviews = ({reviews}) => {
    const reviewsList = reviews.map(review => (
    <div>
      <Card.Group>
        <Card fluid className="reviewDetailCards">
            <Card.Content className="reviewDetailCardContents">
              <p className="reviewListItem">Social Safe Rating: {review.rating}</p>
              <p className="reviewListItem">Social Distance Rating: {review.social_distancing_rating}</p>
              <p className="reviewListItem">Comments: {review.comments}</p>
            </Card.Content>
        </Card>
      </Card.Group>
    </div>
  ))
    return (
      <div>
        {reviewsList}
      </div>
    )
  }
