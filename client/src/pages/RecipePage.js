import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';


const RecipePage = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  const getSpecificRecipe = () => {
    console.log('object');
    axios.post('recipe/specificRecipe', { id })
      .then(recipe => {
        setRecipe(recipe.data)
      })
  }


  useEffect(() => {
    getSpecificRecipe()
    console.log(recipe);
  }, [recipe])


  return (
    <>
      <div style={{
        backgroundImage: `url(${recipe.recipePicture})`,
        height: 500, width: '100%', backgroundSize: 'cover', textAlign: 'center',
      }}>
        <h1>{recipe.recipeName}</h1>

      </div>
      <Container>
        <h2>Description</h2>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map(step => (
            <li>{step}</li>
          ))}
        </ul>

        <h2>Method</h2>
        <ol>
          {recipe.method.map(step => (
            <li>{step}</li>
          ))}
        </ol>


      </Container>

    </>

  )
}

export default RecipePage
