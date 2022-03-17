const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    recipeName: { type: String, unique: true },
    description: String,
    ingredients: Array,
    method: Array,
    prepTime: String,
    cookTime: String,
    servingSize: String,
    difficulty: Number,
    tags: Array,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    recipePicture: Array,
    published: Boolean,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
