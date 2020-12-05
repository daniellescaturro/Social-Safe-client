import React, { Component } from 'react'
import { Form, Modal, Button, Label, TextArea, Segment, Checkbox, Header } from 'semantic-ui-react'


// how do i display info from another model (i.e., restaurants)? want to display:
//restaurant Name
//category / title

export default class ReviewModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      favorite: '',
      rating: '',
      social_distancing_rating: '',
      heat_lamps: '',
      comments: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createReview(this.state)

    this.setState({
      favorite: '',
      rating: '',
      social_distancing_rating: '',
      heat_lamps: '',
      comments: ''
    })
  }

  render() {
    return(
      <Button icon>
        <Icon name='heart outline' />
      </Button>

      <Modal open={true} closeIcon={true} onClose={this.props.closeModal}>

        <Header>
          <h2>Review Restaurant</h2>
        </Header>

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

          <Label horizontal>Rating:</Label>
          <Form.Input
            type="decimal(2,1)"
            name="rating"
            onChange={this.handleChange}
          />

          <Label horizontal>Social Distancing Rating:</Label>
          <Form.Input
            type="decimal(2,1)"
            name="social_distancing_rating"
            onChange={this.handleChange}
          />

          <Label horizontal>Heat Lamps:</Label>
          <Form.Input
            control={Checkbox}
            name="heat_lamps"
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
