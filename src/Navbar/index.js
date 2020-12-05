import React from 'react'
import LoginRegisterContainer from '../LoginRegisterContainer'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default function Navbar(props) {

	return (
		<Menu secondary pointing>
			<Menu.Item>Social Safe</Menu.Item>
			<Menu.Item>My Favorites</Menu.Item>
			<Menu.Item>Add Restaurant</Menu.Item>
			<Menu.Item position='right'>
				<Button onClick={props.logout}>
				Logout
				</Button>
			</Menu.Item>
		</Menu>
	)
}



// <p>Logged in as {props.email}. |&nbsp;
// 	<span className='link' onClick={props.logout}>Log out</span>
// </p>
