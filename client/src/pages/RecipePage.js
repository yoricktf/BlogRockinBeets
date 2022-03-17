import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';


const RecipePage = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  const getSpecificRecipe = () => {
    axios.post('recipe/specificRecipe', { id })
      .then(recipe => {
        setRecipe(recipe.data)
      })
  }

  useEffect(() => {
    getSpecificRecipe()
  }, [])

  console.log(recipe);
  return (
    <>


      <div style={{
        backgroundImage: `url(${recipe.recipePicture[0]})`,
        height: 500, width: '100%', backgroundSize: 'cover'
      }}>
        <h1>{recipe.recipeName}</h1>
      </div>
      <Container>
      </Container>

    </>

  )
}

export default RecipePage
