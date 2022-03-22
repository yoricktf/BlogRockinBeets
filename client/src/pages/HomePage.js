import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


const HomePage = () => {
  const [allRecipes, setAllRecipes] = useState([])
  const [query, setQuery] = useState('')

  const getAllRecipes = () => {
    axios.get('recipe/getRecipes')
      .then(allRecipes => {
        // console.log(allRecipes.data);
        setAllRecipes(allRecipes.data)
      })
  }

  const search = () => {
    // console.log(e.target.value);
    allRecipes.filter(recipe => {

    })
  }

  useEffect(() => {
    getAllRecipes()
  }, [])

  return (
    <div>
      <Container>
        <input type="text" placeholder='search through tags or recipe names' onChange={event => setQuery(event.target.value)} />

        {allRecipes.filter(recipe => {
          if (query === '') {
            return recipe
          } else if (recipe.recipeName.toLowerCase().includes(query.toLowerCase()) || recipe.tags.includes(query.toLowerCase())) {
            return recipe
          }
        }).map((recipe) => (
          <a key={recipe._id} href={`/recipes/${recipe._id}`} >
            <Card className="" >
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title >{recipe.recipeName}</Card.Title>
                <Card.Text>{recipe.tags}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </a>

        ))}



        {/* {allRecipes.map((recipe) => (
          <a key={recipe._id} href={`/recipes/${recipe._id}`} >
            <Card className="" >
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title >{recipe.recipeName}</Card.Title>
                <Card.Text>{recipe.tags}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </a>

        ))} */}
      </Container>
    </div >
  )
}

export default HomePage
