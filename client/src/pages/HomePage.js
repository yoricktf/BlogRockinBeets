import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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

  return (
    <>
      <a key={randomRecipe._id} href={`/recipes/${randomRecipe._id}`} >
        <Card className={'recipeCard'}>
          <Card.Img src={randomRecipe.recipePicture} alt="Card image" />
          <Card.ImgOverlay className='allCardDetails'>
            <div className='center'>
              <div className='featuredCardInfo'>
                <h1>Featured Recipe</h1>
                <Card.Title >{randomRecipe.recipeName}</Card.Title>
                {/* <img className={'profilePicture'} src={randomRecipe.author.profilePicture} alt="" /> */}
              </div>
            </div>

            <div>
              {randomRecipe.tags?.map((tag, index) => (
                <div className={`badge  ${tag}`} key={index}>{tag}</div>
              ))}
            </div>

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
            <Card className={'recipeCard'}>
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay className='allCardDetails'>
                <div className='cardInfo'>
                  <Card.Title >{recipe.recipeName}</Card.Title>
                  <img className={'profilePicture'} src={recipe.author.profilePicture} alt="" />
                </div>
                <div>
                  {recipe.tags?.map((tag, index) => (
                    <div className={`badge  ${tag}`} key={index}>{tag}</div>
                  ))}
                </div>

              </Card.ImgOverlay>
            </Card>
          </a>
        ))}
      </Container>
    </>
  )
}

export default HomePage
