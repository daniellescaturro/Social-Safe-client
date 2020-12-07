import React, { Component } from 'react'
import LoginRegisterForm from '../LoginRegisterForm'
import HomeContainer from '../HomeContainer'
import '../App.css'

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
  console.log("register called with the following info", registerInfo);
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
    console.log("registerResponse", registerResponse);
    const registerJson = await registerResponse.json()
    console.log("registerJson", registerJson);

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
  console.log("login called with the following info", loginInfo);
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
    console.log("loginResponse", loginResponse);
    const loginJson = await loginResponse.json()
    console.log("loginJson", loginJson);

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

// logout = async () => {
//   try {
//     const url = process.env.REACT_APP_API_URL + "/api/v1/users/logout"
//
//     const logoutResponse = await fetch(url, {
//       credentials: 'include'
//     })
//     console.log("logoutResponse", logoutResponse);
//     const logoutJson = await logoutResponse.json()
//     console.log("logoutJson", logoutJson);
//
//     if(logoutResponse.status === 200) {
//       this.setState({
//         loggedIn: false,
//         loggedInUserEmail: ''
//       })
//     }
//   } catch(error) {
//     console.error("Error logging out")
//     console.error(error)
//   }
// }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

//<Navbar email={this.state.loggedInUserEmail} logout={this.logout} />
