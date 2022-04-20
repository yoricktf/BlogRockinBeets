import './New&EditRecipePage.css'
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { AuthContext } from '../context/auth'
import service from "../api/service";


const NewRecipePage = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  // const tagsArray = ['vegetarian', 'vegan', 'breakfast', 'lunch', 'dinner', 'snack', 'side', 'dessert', 'drinks', 'basics']
  const tagsType = ['vegetarian', 'vegan', 'basics']
  const tagsMeal = ['breakfast', 'lunch', 'dinner', 'snack', 'side', 'dessert', 'drinks']
  // setting states for the recipe fields--------
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  const [recipePicture, setRecipePicture] = useState('https://res.cloudinary.com/yozzza/image/upload/v1648454914/Recipe-Images/placeholder_urymnc.jpg')
  const [method, setMethod] = useState('')
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [servingSize, setServingSize] = useState('-')
  const [difficulty, setDifficulty] = useState('')
  const [tags, setTags] = useState([])
  const [author] = useState(user)
  const [published] = useState(false)
  // -----------------------------------------------


  const newRecipe = e => {
    e.preventDefault()
    axios.post('/recipe/newRecipe', { recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published });
    navigate('/')
  }




  const tagCheck = event => {
    let updatedTagList = [...tags];
    if (event.target.checked) {
      updatedTagList = [...tags, event.target.value];
    } else {
      updatedTagList.splice(tags.indexOf(event.target.value), 1);
    }
    setTags(updatedTagList)
  }

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("recipePicture", e.target.files[0]);
    service
      .uploadImage(uploadData)
      .then(response => {
        setRecipePicture(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
    <>
      <Container>
        <h1>New Recipe</h1>
        <Form onSubmit={newRecipe}>
          <Form.Group className="mb-3" controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control onChange={e => setRecipeName(e.target.value)} type="text" placeholder="Enter the recipes name here" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={e => setDescription(e.target.value)} type="text" placeholder="Descridbe the recipe" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Recipe Picture</Form.Label>
            <input className='pictureUpload' type="file" onChange={(e) => handleFileUpload(e)} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="">
            <Form.Label>Ingredients</Form.Label>
            <Form.Text className="text-muted">
              enter the ingredients seperated by 2 percentge signs ( %% )
            </Form.Text>
            <Form.Control onChange={e => setIngredients(e.target.value.split('%%'))} type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Method</Form.Label>
            <Form.Text className="text-muted">
              enter the different steps seperated by 2 percentage signs ( %% )
            </Form.Text>
            <Form.Control onChange={e => setMethod(e.target.value.split('%%'))} type="text" placeholder="" />
          </Form.Group>

          <Row>
            <Col>
              <Form.Label>Prep Time</Form.Label>
              <Form.Select onChange={e => setPrepTime(e.target.value)}>
                <option value="0-15">0-15</option>
                <option value="15-30">15-30</option>
                <option value="30-60">30-60</option>
                <option value="60-90">60-90</option>
                <option value="90-120">90-120</option>
                <option value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Cooking Time</Form.Label>
              <Form.Select onChange={e => setCookTime(e.target.value)}>
                <option value="0-15">0-15</option>
                <option value="15-30">15-30</option>
                <option value="30-60">30-60</option>
                <option value="60-90">60-90</option>
                <option value="90-120">90-120</option>
                <option value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Serving Size</Form.Label>
                <Form.Control onChange={e => setServingSize(e.target.value)} type="text" placeholder="Serving Size" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Difficulty</Form.Label>
              <Form.Select onChange={e => setDifficulty(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Col>
          </Row>
          <h4>Tags</h4>
          <hr />
          <Col className='checkBoxes'>
            {tagsType.map((tag, index) => (
              <div className='checkBox' key={index}>
                <input value={tag} type="checkbox" onChange={tagCheck} />
                <span> {tag}</span>
              </div>
            ))}
          </Col>
          <hr />
          <Col className='checkBoxes'>
            {tagsMeal.map((tag, index) => (
              <div className='checkBox' key={index}>
                <input value={tag} type="checkbox" onChange={tagCheck} />
                <span> {tag}</span>
              </div>
            ))}
          </Col>

          <Button variant="danger" type="submit">
            Make Recipe
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default NewRecipePage
