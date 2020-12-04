import React from 'react'
import LoginRegisterContainer from '../LoginRegisterContainer'


export default function Navbar(props) {
	const navbarStyle = {
		textAlign: 'right',
		fontSize: '14px',
		padding: '10px'
	}


	return (
		<nav style={navbarStyle}>
			<p>Logged in as {props.email}. |&nbsp;
				<span className='link' onClick={props.logout}>Log out</span>
			</p>
		</nav>
	)
}
