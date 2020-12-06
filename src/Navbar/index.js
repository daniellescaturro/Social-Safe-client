import React from 'react'
import {withRouter} from 'react-router'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NewRestaurantForm from '../NewRestaurantForm'
import '../index.css'
import '../App.css'

// 	ORIGINAL LOGOUT FUNCTION
// const logout = async () => {
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
//       localStorage.setItem('active', false);
//			 props.history.push('/');
//     }
//   } catch(error) {
//     console.error("Error logging out")
//     console.error(error)
//   }
// }

 function Navbar(props) {

	const logout = async () => {
	  try {
	    const url = process.env.REACT_APP_API_URL + "/api/v1/users/logout"

	    const logoutResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
	    })
	    console.log("logoutResponse", logoutResponse);
	    const logoutJson = await logoutResponse.json()
	    console.log("logoutJson", logoutJson);

	    if(logoutResponse.status === 200) {
	      localStorage.setItem('active', null);
				localStorage.setItem('userData', null);
				props.history.push('/login');
	    }
	  } catch(error) {
	    console.error("Error logging out")
	    console.error(error)
	  }
	}


	return (
		<Menu secondary pointing className="navbar">
			<Menu.Item><Icon name='glass martini' color='black'></Icon></Menu.Item>
			<Menu.Item fontsize={18}><Link to='/'>Social Safe</Link></Menu.Item>
			<Menu.Item><Link to="/favorites">My Favorites</Link></Menu.Item>
			<Menu.Item><Link to="/add_restaurant">Add Restaurant</Link></Menu.Item>
			<Menu.Item position='right'><Link to="/login">Login</Link></Menu.Item>
			<Menu.Item><Link to="#" onClick={()=>logout()}>Logout</Link></Menu.Item>
		</Menu>
	)
}
export default withRouter(Navbar)

//DO I NEED A BUTTON FOR LOGOUT? OR CAN IT BE ACCOMPLISHED WITH A LINK, LIKE ABOVE?
// <Button size='small' onClick={()=>logout()}>
// Logout
// </Button>
