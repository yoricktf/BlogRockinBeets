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
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

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
})



module.exports = router;
