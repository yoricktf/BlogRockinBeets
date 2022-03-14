const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: { type: String, unique: true },
    ingredients: Array,
    picture: Array,
    description: String,
    method: Array,
    prepTime: Number,
    cookTime: Number,
    servingSize: Number,
    difficulty: String,
    tags: Array,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    published: Boolean,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
