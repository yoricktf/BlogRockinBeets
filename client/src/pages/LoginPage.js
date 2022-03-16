import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'


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

  const handleEmail = e => setEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)



  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />
        <button type="submit">Log In</button>
      </form>

      {errorMessage && <h5>{errorMessage}</h5>}

      <h3>Don't have an account?</h3>
      <Link to='/signup'>Signup</Link>



      <h1>================================================================</h1>
      <Form size='massive'>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </>


  )
}

export default Login
