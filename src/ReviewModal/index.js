import React, { Component } from 'react'
import { Form, Modal, Button, Label, TextArea, Segment, Checkbox, Header } from 'semantic-ui-react'


export default class ReviewModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rating: '',
      social_distancing_rating: '',
      comments: ''
    }
  }

  handleChange = (event, data) => {
    // console.log(event.target, data)
    // if(data.type === 'checkbox'){
    //
    //   this.setState({
    //     ['heat_lamps']: data.checked
    //   })
    // }else{
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  //   console.log(event.target)
  // }

  handleSubmit = (event) => {
    event.preventDefault()

    this.createReview(this.state)

    this.setState({
      rating: '',
      social_distancing_rating: '',
      heat_lamps: false,
      comments: ''
    })
  }

  createReview = async (reviewToAdd) => {
      try {
        if(this.props.restaurantToReview.id != undefined){
          const url = process.env.REACT_APP_API_URL + "/api/v1/reviews/" + this.props.idOfRestaurantToReview
          const createReviewResponse = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reviewToAdd)
          })
          const createReviewJson = await createReviewResponse.json()

          if(createReviewResponse.status === 201 || createReviewResponse.status === 200){
            this.props.closeModal()
          }
        }else {
          const url = process.env.REACT_APP_API_URL + "/api/v1/reviews/-1"
          const data = {
            review: reviewToAdd,
            restaurant: this.props.restaurantToReview
          }
          const createReviewResponse = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
          })
          const createReviewJson = await createReviewResponse.json()

          if(createReviewResponse.status === 201 || createReviewResponse.status === 200){
            this.props.closeModal()
          }
        }


      } catch(err) {
        console.log("Error adding review", err)
      }
    }

  render() {
    return(
      <Modal open={true} closeIcon={true} onClose={this.props.closeModal}>

        <Header>
          <h2>Review Restaurant</h2>
        </Header>

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

          <Label horizontal>Rating:</Label>
          <Form.Input
            type="number"
            name="rating"
            max="5"
            min="1"
            onChange={this.handleChange}
          />

          <Label horizontal>Social Distance Rating:</Label>
          <Form.Input
            type="number"
            name="social_distancing_rating"
            max="5"
            min="1"
            onChange={this.handleChange}
          />

          <Label horizontal>Comments:</Label>
          <Form.TextArea
            name="comments"
            value={this.state.comments}
            placeholder="Enter comments"
            onChange={this.handleChange}
          />

          <Modal.Actions>
            <Button type='submit'>Submit</Button>
          </Modal.Actions>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
