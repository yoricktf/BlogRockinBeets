import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


const HomePage = () => {
  const [allRecipes, setAllRecipes] = useState([])

  const getAllRecipes = () => {
    axios.get('recipe/getRecipes')
      .then(allRecipes => {
        // console.log(allRecipes.data);
        setAllRecipes(allRecipes.data)
      })
  }

  useEffect(() => {
    getAllRecipes()
  }, [])

  return (
    <div>
      <Container>
        {allRecipes.map((recipe) => (
          <a key={recipe._id} href={`/recipes/${recipe._id}`} >
            <Card className="" >
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title >{recipe.recipeName}</Card.Title>
                {/* <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text> */}
                {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
              </Card.ImgOverlay>
            </Card>
          </a>

        ))}
      </Container>
    </div >
  )
}

export default HomePage
