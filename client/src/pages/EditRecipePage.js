import './New&EditRecipePage.css'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { AuthContext } from '../context/auth'
import service from "../api/service";

const EditRecipePage = () => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  // const tagsArray = ['vegan', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'italian', 'indian', 'asian', 'mexican', 'salad', 'drinks', 'middle-eastern', 'french', 'slowcarb', 'basics']
  const tagsType = ['vegetarian', 'vegan', 'basics']
  const tagsMeal = ['breakfast', 'lunch', 'dinner', 'snack', 'side', 'dessert', 'drinks']
  // setting states for the recipe fields--------
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  const [recipePicture, setRecipePicture] = useState('')
  const [method, setMethod] = useState('')
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [servingSize, setServingSize] = useState(0)
  const [difficulty, setDifficulty] = useState('')
  const [tags, setTags] = useState([])
  const [author, setAuthor] = useState(user)
  const [published, setPublished] = useState(false)
  // const [ingredientsBase, setIngredientsBase] = useState('')
  // const [methodBase, setMethodBase] = useState('')
  // const [recipe, setRecipe] = useState({})
  // -----------------------------------------------
  const { id } = useParams()

  // console.log(recipe);


  const getSpecificRecipe = async () => {
    const response = await axios.post('/recipe/specificRecipe', { id })
    const { recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published } = response.data
    // setRecipe(response.data)
    setRecipeName(recipeName)
    setIngredients(ingredients.join('%%'))
    setDescription(description)
    setRecipePicture(recipePicture)
    setMethod(method.join('%%'))
    setPrepTime(prepTime)
    setCookTime(cookTime)
    setServingSize(servingSize)
    setDifficulty(difficulty)
    setTags(tags)
    setAuthor(author)
    setPublished(published)
  }

  const editRecipe = (e) => {
    e.preventDefault()
    axios.post('/recipe/editRecipe', { id, recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published })
    navigate(`/recipes/${id}`)
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

  useEffect(() => {
    getSpecificRecipe()
  }, [])

  return (
    <>
      <Container>
        <h1>Edit Recipe</h1>
        <Form onSubmit={editRecipe}>
          <Form.Group className="mb-3" controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control value={recipeName} onChange={e => setRecipeName(e.target.value)} type="text" placeholder="enter ingredient and add here" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="enter method step by step" />
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
            <Form.Control
              // value={ingredients?.join('%%')}
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Method</Form.Label>
            <Form.Text className="text-muted">
              enter the different steps seperated by 2 percentage signs ( %% )
            </Form.Text>
            <Form.Control
              // value={method?.join('%%')}
              value={method}
              // onChange={e => setMethod(e.target.value.split('%%'))}
              onChange={e => setMethod(e.target.value)}

              type="text"
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Label>Prep Time</Form.Label>
              <Form.Select onChange={e => setPrepTime(e.target.value)}>
                <option selected={prepTime === '0-15' ? true : false} value="0-15">0-15</option>
                <option selected={prepTime === '15-30' ? true : false} value="15-30">15-30</option>
                <option selected={prepTime === '30-60' ? true : false} value="30-60">30-60</option>
                <option selected={prepTime === '60-90' ? true : false} value="60-90">60-90</option>
                <option selected={prepTime === '90-120' ? true : false} value="90-120">90-120</option>
                <option selected={prepTime === '>120' ? true : false} value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Cooking Time</Form.Label>
              <Form.Select onChange={e => setCookTime(e.target.value)}>
                <option selected={cookTime === '0-15' ? true : false} value="0-15">0-15</option>
                <option selected={cookTime === '15-30' ? true : false} value="15-30">15-30</option>
                <option selected={cookTime === '30-60' ? true : false} value="30-60">30-60</option>
                <option selected={cookTime === '60-90' ? true : false} value="60-90">60-90</option>
                <option selected={cookTime === '90-120' ? true : false} value="90-120">90-120</option>
                <option selected={cookTime === '>120' ? true : false} value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Serving Size</Form.Label>
                <Form.Control value={servingSize} onChange={e => setServingSize(e.target.value)} type="text" placeholder="Serving Size" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Difficulty</Form.Label>
              <Form.Select onChange={e => setDifficulty(e.target.value)}>
                <option selected={difficulty === 1 ? true : false} value="1">1</option>
                <option selected={difficulty === 2 ? true : false} value="2">2</option>
                <option selected={difficulty === 3 ? true : false} value="3">3</option>
                <option selected={difficulty === 4 ? true : false} value="4">4</option>
                <option selected={difficulty === 5 ? true : false} value="5">5</option>
              </Form.Select>
            </Col>
          </Row>
          <h4>Tags</h4>
          <hr />
          <Col className='checkBoxes'>
            {tagsType.map((tag, index) => (
              <div className='checkBox' key={index}>
                <input
                  checked={tags?.includes(tag) ? true : false}
                  value={tag}
                  type="checkbox"
                  onChange={tagCheck} />
                <span> {tag}</span>
              </div>
            ))}
          </Col>

          <hr />
          <Col className='checkBoxes'>
            {tagsMeal.map((tag, index) => (
              <div className='checkBox' key={index}>
                <input
                  checked={tags?.includes(tag) ? true : false}
                  value={tag}
                  type="checkbox"
                  onChange={tagCheck} />
                <span> {tag}</span>
              </div>
            ))}
          </Col>




          {/* <hr />
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
          </Col> */}









          <Button className='submitButton' variant="danger" type="submit">
            Update Recipe
          </Button>
        </Form>
      </Container>
    </>

  )
}

export default EditRecipePage
