import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/auth';



const RecipePage = () => {
  const { id } = useParams()
  const { isLoggedIn, user } = useContext(AuthContext)
  const [recipe, setRecipe] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState([])



  // const getSpecificRecipe = () => {
  //   console.log('object');
  //   axios.post('recipe/specificRecipe', { id })
  //     .then(recipe => {
  //       setRecipe(recipe.data)
  //     })
  // }

  const getSpecificRecipe = async () => {
    const response = await axios.post('/recipe/specificRecipe', { id })
    setRecipe(response.data)
    setIngredients(response.data.ingredients)
    setMethod(response.data.method)
  }

  useEffect(() => {
    getSpecificRecipe()
  }, [])



  return (
    <>
      <div style={{
        backgroundImage: `url(${recipe.recipePicture})`,
        height: 500, width: '100%', backgroundSize: 'cover', textAlign: 'center',
      }}>
        <h1>{recipe.recipeName}</h1>
      </div>
      <Container>

        {!user ? (<></>) : (
          user._id === recipe.author ? (
            <>

              <Button href={`/recipes/${recipe._id}/edit`}>edit this recipe</Button>
            </>
          ) : (
            <></>
          )
        )}

        <h2>Description</h2>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>

        <ul>
          {recipe.ingredients?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        <h2>Method</h2>
        <ol>
          {recipe.method?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </Container>
    </>
  )
}

export default RecipePage
