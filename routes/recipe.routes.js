const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Recipe = require('../models/Recipe.model')

router.post('/newRecipe', (req, res, next) => {
  const { recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published } = req.body
  Recipe.create({ recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published })
    .then(recipe => {
      res.status(200).json(recipe)
    })
    .catch(err => next(err))
})

router.post("/upload", fileUploader.single("recipePicture"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});

router.get('/getRecipes', (req, res, next) => {
  Recipe.find()
    .then(allRecipes => {
      res.status(200).json(allRecipes)
    })
})


router.post('/specificRecipe', (req, res, next) => {
  Recipe.findById(req.body.id)
    .then(recipe => {
      res.status(200).json(recipe)
    })
    .catch(err => console.log(err))
})



module.exports = router;
