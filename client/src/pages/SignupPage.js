import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import service from "../api/service";

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png')
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    console.log('+++++++++++++++++++++++++++++++++++++++');
    const requestBody = { email, password, name, profilePicture }
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

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("profilePicture", e.target.files[0]);
    service
      .uploadProfileImage(uploadData)
      .then(response => {
        setProfilePicture(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };





  return (
    <>
      <Container>
        <h1>Signup</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profile Picture:</Form.Label>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
          </Form.Group>


          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control value={password} type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button type="submit">
            Sign Up
          </Button>

        </Form>
        {errorMessage && <h5>{errorMessage}</h5>}
        <h3>Already have an account?</h3>
        <Link to='/login'>Login</Link>

      </Container>
      {/* <h1>Signup</h1>
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



      <h3>Already have an account?</h3>
      <Link to='/login'>Login</Link> */}
    </>
  )
}
