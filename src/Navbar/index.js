import React from 'react'
import { withRouter } from 'react-router'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NewRestaurantForm from '../NewRestaurantForm'
import '../index.css'
import '../App.css'


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
			<Menu.Item className='companyName'>
        <Icon name='food' color='grey' className="logo"></Icon>
        <Link to='/'>Social Safe</Link>
      </Menu.Item>
			<Menu.Item className="menuItems"><Link to="/favorites">My Favorites</Link></Menu.Item>
			<Menu.Item className="menuItems"><Link to="/add_restaurant">Add Restaurant</Link></Menu.Item>
			<Menu.Item position='right' className="menuItems"><Button><Icon name='sign in'/><Link to="/login">Login</Link></Button></Menu.Item>
			<Menu.Item className='menuItems'><Button><Icon name='log out'/><Link to="#" onClick={()=>logout()}>Logout</Link></Button></Menu.Item>
		</Menu>
	)
}
export default withRouter(Navbar)
