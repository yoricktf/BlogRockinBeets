import './Navbar.css'
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';




const WebNavbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState('')
  const [profilePic, setProfilePic] = useState('')


  const getUser = () => {
    axios.post('/getUser', user)
      .then(user => {
        // console.log(user.data.profilePicture)
        setProfilePic(user.data.profilePicture)
        setCurrentUser(user.data)
      })
  }

  useEffect(() => {
    getUser()
  }, [user])

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  }
  const hideDropdown = e => {
    setShow(false);
  }


  return (
    <Navbar
      fixed='top'
      // className='navbar-static-top'
      variant='light'
      bg='light'
    >
      <Container>
        {isLoggedIn ?
          (
            <>
              <Navbar.Brand href="/">
                Blog Rockin Beets
              </Navbar.Brand>

              <div className="userOptions dropdown">

                <NavDropdown

                  title={<img src={profilePic} className={'profilePicture'} alt="" />}
                  id="collasible-nav-dropdown"
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <Dropdown.Item href="/recipes/new">New Recipe</Dropdown.Item>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutUser} >Log Out</Dropdown.Item>
                </NavDropdown>



                {/* <div className="dropdown-content">
                  <Button href='/recipes/new'>New Recipe</Button>
                  <Button href='#'>Settings</Button>
                  <Button variant='danger' onClick={logoutUser}>Log Out</Button>
                </div> */}
              </div>
            </>
          ) : (
            <>
              <Navbar.Brand href="/">
                Blog Rockin Beets
              </Navbar.Brand>

              <div className="userOptions">
                <Button href='/login'>Login</Button>
                <Button href='/signup'>signup</Button>
              </div>
            </>

          )}
      </Container>
    </Navbar>
  );
}

export default WebNavbar;
