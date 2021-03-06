import './Signup&LoginPage.css'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate()
  const { storeToken, verifyStoredToken } = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
    const requestBody = { email, password }
    axios.post('/auth/login', requestBody)
      .then(response => {
        // redirect to projects
        console.log('i have a token mothafukkas')
        const token = response.data.authToken
        console.log(response.data);
        // Change: this only stores the token
        storeToken(token)
        // Change: we also call verify
        // Change because verifyStoredToken return a promise now we can chain
        // a .then and wait for the response
        verifyStoredToken()
          .then(() => {
            // redirect to projects
            navigate('/')
          })
      })
      .catch(err => {
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription)
      })
  }


  return (
    <>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button className='submitButton' type="submit">
            Login
          </Button>
        </Form>
        {errorMessage && <h5>{errorMessage}</h5>}

        <h3>Don't have an account?</h3>
        <Link to='/signup'>Signup</Link>


      </Container>



    </>


  )
}

export default Login
