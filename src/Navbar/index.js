import React from 'react'
import { withRouter } from 'react-router'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../index.css'


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
	    const logoutJson = await logoutResponse.json()

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
        <Link className="navbarLink" to='/'>Social Safe</Link>
      </Menu.Item>
			<Menu.Item className="menuItems"><Link className="navbarLink"to="/favorites">My Favorites</Link></Menu.Item>
			<Menu.Item className="menuItems"><Link className="navbarLink" to="/add_restaurant">Add Restaurant</Link></Menu.Item>
			<Menu.Item position='right' className="menuItems"><Button><Icon name='sign in'/><Link className="buttonLink" to="/login">Login</Link></Button></Menu.Item>
			<Menu.Item className='menuItems'><Button><Icon name='log out'/><Link className="buttonLink "to="#" onClick={()=>logout()}>Logout</Link></Button></Menu.Item>
		</Menu>
	)
}
export default withRouter(Navbar)
