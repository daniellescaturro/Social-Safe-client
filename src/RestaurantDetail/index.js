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

      if(restaurantResponse.status == 200 || restaurantResponse.status == 201) {
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
    return total / reviews.length
  }

  calculateAvgSocDistReview = (reviews) => {
    let total = 0
    reviews.forEach((item, i) => {
        total += item.social_distancing_rating
    });
    return total / reviews.length
  }


  render() {
    return (
      <Container textAlign={"center"}>
        <Image src={this.state.restaurant.image_url} />
        <Header as='h2'><a href={this.state.restaurant.url}>{this.state.restaurant.name}</a></Header>
        <p className="restaurantCategorySP">{this.state.restaurant.title}</p>
        <p className="addressSP">{this.state.restaurant.address1}</p>
        <p className="addressSP">{this.state.restaurant.city}, {this.state.restaurant.state} {this.state.restaurant.zip_code}</p>
        <p className="cardDetailSP">Yelp rating: {this.state.restaurant.rating}</p>
        <p className="cardDetail">Social Safe Rating: {this.state.restaurant.reviews.length==0 ? "Not yet rated" : this.calculateAvgReview(this.state.restaurant.reviews) }</p>
        <p className="cardDetail">Social Distance Rating: {this.state.restaurant.reviews.length== 0 ? "Not yet rated" : this.calculateAvgSocDistReviewAvg(this.state.restaurant.reviews) }</p>
        <p className="cardDetailSP">Heat Lamps: {this.state.restaurant.heat_lamps==true?'Yes':'No'}</p>

        <React.Fragment>
          <Header as='h4'>Reviews</Header>
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
        <Card fluid>
            <Card.Content>
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
