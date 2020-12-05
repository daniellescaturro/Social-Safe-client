import React, { Component } from 'react'
import { Form, Button, Label, Segment, Checkbox, Header } from 'semantic-ui-react'

//add favorite here?

export default class NewRestaurantForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      image_url: '',
      url: '',
      title: '',
      address1: '',
      city: '',
      state: '',
      zip_code: '',
      rating: '',
      heat_lamps: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createRestaurant(this.state)

    this.setState({
      name: '',
      image_url: '',
      url: '',
      title: '',
      address1: '',
      city: '',
      state: '',
      zip_code: '',
      rating: '',
      heat_lamps: ''
    })
  }

  render() {
    return(
      <Segment>
      <Header>
        <h2>Add Restaurant</h2>
      </Header>
      <Form onSubmit={this.handleSubmit}>

        <Label horizontal>Restaurant Name:</Label>
        <Form.Input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Enter restaurant name"
          onChange={this.handleChange}
        />

        <Label horizontal>Image:</Label>
        <Form.Input
          type="text"
          name="image_url"
          value={this.state.image_url}
          placeholder="Enter an image link"
          onChange={this.handleChange}
        />

        <Label horizontal>Link:</Label>
        <Form.Input
          type="text"
          name="url"
          value={this.state.url}
          placeholder="Enter website link"
          onChange={this.handleChange}
        />

        <Label horizontal>Category:</Label>
        <Form.Input
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Enter category"
          onChange={this.handleChange}
        />

        <Label horizontal>Street Address:</Label>
        <Form.Input
          type="text"
          name="address1"
          value={this.state.address1}
          placeholder="Enter street address"
          onChange={this.handleChange}
        />

        <Label horizontal>City:</Label>
        <Form.Input
          type="text"
          name="city"
          value={this.state.city}
          placeholder="Enter city"
          onChange={this.handleChange}
        />

        <Label horizontal>State:</Label>
        <Form.Input
          type="text"
          name="state"
          value={this.state.city}
          placeholder="Enter city"
          onChange={this.handleChange}
        />

        <Label horizontal>Zip Code:</Label>
        <Form.Input
          type="smallInteger"
          name="zip_code"
          value={this.state.zip_code}
          placeholder="Enter zip code"
          onChange={this.handleChange}
        />

        <Label horizontal>Rating:</Label>
        <Form.Input
          type="decimal(2,1)"
          name="rating"
          value={this.state.rating}
          placeholder="Enter a resource"
          onChange={this.handleChange}
        />

        <Label horizontal>Heat Lamps:</Label>
        <Form.Input
          control={Checkbox}
          name="heat_lamps"
          value={this.state.heat_lamps}
          onChange={this.handleChange}
        />

        <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    )
  }
}
