import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';



const HomePage = () => {

  const [allRecipes, setAllRecipes] = useState([])
  const [query, setQuery] = useState('')
  const [randomRecipe, setRandomRecipe] = useState({})



  const getAllRecipes = () => {
    axios.get('recipe/getRecipes')
      .then(allRecipes => {
        setAllRecipes(allRecipes.data)
        setRandomRecipe(allRecipes.data[Math.floor(Math.random() * allRecipes.data.length)]);
      })
  }




  useEffect(() => {
    getAllRecipes()
  }, [])

  console.log(randomRecipe);

  return (
    <>
      {/* <p>{randomNumber}</p> */}
      <a key={randomRecipe._id} href={`/recipes/${randomRecipe._id}`} >
        <Card style={{ width: '50%', margin: 10 }}>
          <Card.Img src={randomRecipe.recipePicture} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title >{randomRecipe.recipeName}</Card.Title>
            {randomRecipe.tags?.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </Card.ImgOverlay>
        </Card>
      </a>



      <Container>
        <input type="text" placeholder='search through tags or recipe names' onChange={event => setQuery(event.target.value)} style={{ width: '100%' }} />





        {allRecipes.filter(recipe => {
          if (query === '') {
            return recipe
          } else if (recipe.recipeName.toLowerCase().includes(query.toLowerCase()) || recipe.tags.includes(query.toLowerCase())) {
            return recipe
          }
        }).map((recipe) => (
          <a key={recipe._id} href={`/recipes/${recipe._id}`} >
            <Card style={{ margin: 10 }}>
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title >{recipe.recipeName}</Card.Title>
                {/* <Card.Text>{recipe.tags}</Card.Text> */}
                {recipe.tags?.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </Card.ImgOverlay>
            </Card>
          </a>
        ))}
      </Container>
    </>
  )
}

export default HomePage
