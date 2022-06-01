import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const SettingsPage = () => {

  const changeSettings = (e) => {

  }

  const handleProfilePictureUpdate = (params) => {

  }



  return (
    <Container>
      <h1>SettingsPage</h1>
      <Form onSubmit={changeSettings}>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value={'car'} onChange={e => changeSettings(e)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control value={'car'} onChange={e =>  changeSettings(e)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Recipe Picture</Form.Label>
          <input className='pictureUpload' type="file" onChange={(e) => handleProfilePictureUpdate(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control value={'car'} onChange={e => changeSettings(e)}></Form.Control>
        </Form.Group>
        <Button className='submitButton' variant="danger" type="submit">
          update settings
        </Button>
      </Form>
    </Container>

  )
}

export default SettingsPage
