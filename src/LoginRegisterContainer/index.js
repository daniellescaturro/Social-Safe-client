import React, { Component } from 'react'
import LoginRegisterForm from '../LoginRegisterForm'
import HomeContainer from '../HomeContainer'


export default class LoginRegisterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      loggedInUserEmail: ''
    }
  }

  componentDidMount(){
    if(localStorage.getItem('active') === 'active'){
      this.props.history.push('/');
    }
  }

register = async (registerInfo) => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/users/register"

  try {
    const registerResponse = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const registerJson = await registerResponse.json()

    if(registerResponse.status === 201) {
     this.setState({
       loggedIn: true,
       loggedInUserEmail: registerJson.data.email
       })
       localStorage.setItem('active', 'active')
       localStorage.setItem('userData', JSON.stringify(registerJson.data))
       this.props.history.push('/');
     }
  } catch(err) {
    console.error("Error trying to register with API")
    console.error(err)
  }
}

login = async (loginInfo) => {
  const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'

  try {
    const loginResponse = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const loginJson = await loginResponse.json()

    if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email
        })
        localStorage.setItem('active', 'active')
        localStorage.setItem('userData', JSON.stringify(loginJson.data))
        this.props.history.push('/');
      }
  } catch(error) {
    console.error("Error trying to log in")
    console.error(error)
  }
}


  render() {
    return (
      <div className="LoginRegisterContainer">
        {
          this.state.loggedIn
          ?
          <React.Fragment>
            <HomeContainer />
          </React.Fragment>
          :
          <LoginRegisterForm
            login={this.login}
            register={this.register}
          />
        }
    </div>
    )
  }
}
