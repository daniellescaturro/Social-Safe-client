import React, { Componet } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import '..index.css'


export default class LoginRegisterForm extends Component {

  constructor() {
    super()

      this.state = {
        username: '',
        email: '',
        password: '',
        action: 'Login'
    }
  }

switchForm = () => {
  if(this.state.action === "Login") {
    this.setState({ action})
  }
}




}
