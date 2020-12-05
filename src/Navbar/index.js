import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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


export default function Navbar(props) {
	console.log(props)
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
				props.history.push('/');
	    }
	  } catch(error) {
	    console.error("Error logging out")
	    console.error(error)
	  }
	}
	return (
		<Menu secondary pointing>
			<Menu.Item><Link to='/'>Social Safe</Link></Menu.Item>
			<Menu.Item><Link to="/favorites">My Favorites</Link></Menu.Item>
			<Menu.Item><Link to="/add_restaurant">Add Restaurant</Link></Menu.Item>
			<Menu.Item position='right'>
				<Button onClick={()=>logout()}>
				Logout
				</Button>
			</Menu.Item>
		</Menu>
	)
}



// <p>Logged in as {props.email}. |&nbsp;
// 	<span className='link' onClick={props.logout}>Log out</span>
// </p>
