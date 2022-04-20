import './HomePage.css'
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


  // const fillInput = event => {
  //   console.log(event.target.parentNode.id);
  //   let inputValue = event.target.parentNode.id
  //   const inputField = document.getElementById('searchInput')
  //   inputField.value = inputValue
  // }


  return (
    <>
      <a key={randomRecipe._id} href={`/recipes/${randomRecipe._id}`}>
        <header style={{ backgroundImage: `url(${randomRecipe.recipePicture})` }}>

          <div className='center'>
            <div className='featuredCardInfo recipeTitle'>
              <h1>Featured Recipe</h1>
              <Card.Title >{randomRecipe.recipeName}</Card.Title>
              {/* <img className={'profilePicture'} src={randomRecipe.author.profilePicture} alt="" /> */}
            </div>
          </div>
        </header>
      </a>
      {/* ---------START----------------BASICS SECTION WITH HORIZONTAL SCROLL-----------------START----------------------- */}
      <section className='mainBody'>
        <h2>Check out some Basics</h2>
        <div className='horizontalSection'>
          {allRecipes.filter(recipe => {
            if (recipe.tags.includes('basics')) {
              return recipe
            }
          }).map(recipe => (
            <a key={recipe._id} href={`/recipes/${recipe._id}`}>
              <div className='horizontalCard' style={{ backgroundImage: `url(${recipe.recipePicture})` }}>
                <div className='overlay'>
                  <h1>{recipe.recipeName}</h1>
                  <div>
                    {recipe.tags?.map((tag, index) => (
                      <div className={`badge  ${tag}`} key={index}><span>{tag}</span></div>
                    ))}
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>
      </section>
      {/* ---------END----------------BASICS SECTION WITH HORIZONTAL SCROLL-------------------END--------------------- */}

      {/* ---------START----------------BREAKFAST COLLECTION SECTION-----------------START----------------------- */}









      {/* ---------END----------------BREAKFAST COLLECTION SECTION-------------------END--------------------- */}

      {/* ---------START----------------SNACK SECTION WITH HORIZONTAL SCROLL-----------------START----------------------- */}
      <section className='mainBody'>
        <h2>Feeling Peckish? Make a Quick Snack</h2>
        <div className='horizontalSection'>
          {allRecipes.filter(recipe => {
            if (recipe.tags.includes('snack')) {
              return recipe
            }
          }).map(recipe => (
            <a key={recipe._id} href={`/recipes/${recipe._id}`}>
              <div className='horizontalCard' style={{ backgroundImage: `url(${recipe.recipePicture})` }}>
                <div className='overlay'>
                  <h1>{recipe.recipeName}</h1>
                  <div>
                    {recipe.tags?.map((tag, index) => (
                      <div className={`badge  ${tag}`} key={index}><span>{tag}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      {/* ---------END----------------SNACK SECTION WITH HORIZONTAL SCROLL-------------------END--------------------- */}

      <Container>
        <input id='searchInput' type="text" placeholder="try 'banana bread', or 'basics'" onChange={event => setQuery(event.target.value)} style={{ width: '100%' }} />
      </Container>


      <Container className='directory'>

        {allRecipes.filter(recipe => {
          if (query === '') {
            return recipe
          } else if (recipe.recipeName.toLowerCase().includes(query.toLowerCase()) || recipe.tags.includes(query.toLowerCase())) {
            return recipe
          }
        }).map(recipe => (

          <a className='testing' key={recipe._id} href={`/recipes/${recipe._id}`} >
            {/* <div className='searchCard' style={{ backgroundImage: `url(${recipe.recipePicture})` }} >

              <div className="overlay">
                <div className='cardInfo'>
                  <h1>{recipe.recipeName}</h1>
                  <img className='profilePicture' src={recipe.author.profilePicture} alt="" />
                </div>
                <div>
                  {recipe.tags?.map((tag, index) => (
                    <div className={`badge  ${tag}`} key={index}> <span>{tag}</span> </div>
                  ))}
                </div>
              </div>
            </div> */}










            <Card className={'recipeCard'}>
              <Card.Img src={recipe.recipePicture} alt="Card image" />
              <Card.ImgOverlay className='allCardDetails'>
                <div className='cardInfo'>
                  <h1 >{recipe.recipeName}</h1>
                  <img className={'profilePicture'} src={recipe.author.profilePicture} alt="" />
                </div>
                <div>
                  {recipe.tags?.map((tag, index) => (
                    <div className={`badge  ${tag}`} key={index}> <span>{tag}</span> </div>
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
