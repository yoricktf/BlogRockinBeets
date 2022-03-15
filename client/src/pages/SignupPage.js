import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    console.log('+++++++++++++++++++++++++++++++++++++++');
    const requestBody = { email, password, name }
    axios.post('/auth/signup', requestBody)
      .then(response => {
        // redirect to login
        navigate('/login')
      })
      .catch(err => {
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  // const test = () => {
  //   console.log('test');
  //   axios.get('/api/test')
  // }

  const test = () => {
    console.log('test');
    const http = axios.create({ baseURL: 'http://localhost:5005' });
    http.get('/api/test')
  }

  const handleEmail = e => setEmail(e.target.value)
  const handleName = e => setName(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const [errorMessage, setErrorMessage] = useState(undefined);

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />
        <label htmlFor="name">Name: </label>
        <input type="text" value={name} onChange={handleName} />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <h5>{errorMessage}</h5>}

      <h1 onClick={test}>test</h1>

      <h3>Already have an account?</h3>
      <Link to='/login'>Login</Link>
    </>
  )
}
