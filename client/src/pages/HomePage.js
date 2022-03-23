import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const HomePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext)
  const [allRecipes, setAllRecipes] = useState([])
  const [query, setQuery] = useState('')

  // const randomNumber = Math.floor(Math.random(allRecipes.length - 1))
  let randomRecipe = allRecipes[2]



  const getAllRecipes = () => {
    axios.get('recipe/getRecipes')
      .then(allRecipes => {
        // console.log(allRecipes.data);
        setAllRecipes(allRecipes.data)

      })
  }

  console.log(user)


  useEffect(() => {
    getAllRecipes()
  }, [])

  return (
    <>
      {/* <p>{randomNumber}</p> */}
      {/* <a key={randomRecipe._id} href={`/recipes/${randomRecipe._id}`} >
        <Card className="" >
          <Card.Img src={randomRecipe.recipePicture} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title >{randomRecipe.recipeName}</Card.Title>
            <Card.Text>{randomRecipe.tags}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </a> */}



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
            <Card className="" >
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title >{recipe.recipeName}</Card.Title>
                {user._id === recipe.author ? (
                  <>

                    <Button href='/login'>edit this recipe</Button>
                  </>
                ) : (
                  <></>
                )}
                <Card.Text>{recipe.tags}</Card.Text>

              </Card.ImgOverlay>
            </Card>
          </a>
        ))}
      </Container>
    </>
  )
}

export default HomePage
