import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/auth';



const RecipePage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [recipe, setRecipe] = useState({})
  const navigate = useNavigate()




  const getSpecificRecipe = () => {
    console.log('object');
    axios.post('recipe/specificRecipe', { id })
      .then(recipe => {
        setRecipe(recipe.data)
      })
  }
  // ------------THIS IS THE SAME METHOD AS ABOVE BUT USING ASYNC TO TRY AND DEBUG A PROBLEM WITH LOADING TIME----------
  // const getSpecificRecipe = async () => {
  //   const response = await axios.post('/recipe/specificRecipe', { id })
  //   setRecipe(response.data)
  // }

  const deleteRecipe = () => {
    axios.post('recipe/deleteRecipe', { id })
    navigate('/')
  }

  useEffect(() => {
    getSpecificRecipe()
  }, [])



  return (
    <>
      <div className='recipeShowPagePicture' style={{
        backgroundImage: `url(${recipe.recipePicture})`,
        height: 500, width: '100%', backgroundSize: 'cover', textAlign: 'center',
      }}>
        <h1>{recipe.recipeName}</h1>

      </div>
      <Container>

        {user ? (user._id === recipe.author ? (
          <>
            <Button href={`/recipes/${recipe._id}/edit`}>edit this recipe</Button>
            <Button onClick={deleteRecipe}>delete this recipe</Button>
          </>
        ) : (
          <></>
        )) : (
          <></>
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
