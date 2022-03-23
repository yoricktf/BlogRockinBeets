import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';




const WebNavbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState('')


  const getUser = () => {
    axios.post('/getUser', user)
      .then(user => {
        setCurrentUser(user.data)
      })
  }

  useEffect(() => {
    getUser()
  }, [user])





  return (
    <Navbar bg="dark" variant="dark" >
      <Container>
        {isLoggedIn ?
          (
            <div>
              <Navbar.Brand href="/">
                Blog Rockin Beets
              </Navbar.Brand>
              <Button href='/recipes/new'>New Recipe</Button>
              <Button variant='danger' onClick={logoutUser}>Log Out</Button>
            </div>
          ) : (
            <Navbar.Brand href="/">
              Blog Rockin Beets
            </Navbar.Brand>
          )}
      </Container>
    </Navbar>
  );
}

export default WebNavbar;
