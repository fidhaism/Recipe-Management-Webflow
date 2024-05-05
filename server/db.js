
const { MongoClient, ObjectId } = require('mongodb');
let db;

async function connectToDB() {
  if (!db) {
    db = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return db;
}

async function getRecipes() {
  const db = await connectToDB();
  const recipesCollection = db.db('recipeDB').collection('recipes');
  const recipes = await recipesCollection.find().toArray();
  return recipes;
}

async function addRecipe(recipe) {
  const db = await connectToDB();
  const recipesCollection = db.db('recipeDB').collection('recipes');
  return recipesCollection.insertOne(recipe);
}

async function getRecipeById(id) {
  const db = await connectToDB();
  const recipesCollection = db.db('recipeDB').collection('recipes');
  
  // Convert the provided id to ObjectId
  const objectId = new ObjectId(id);
  
  return recipesCollection.findOne({ _id: objectId });
}


async function deleteRecipeById(id, ObjectId) {
  const db = await connectToDB();
  const recipesCollection = db.db('recipeDB').collection('recipes');
  
  // Check if the id is a valid ObjectId before attempting to delete
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid recipe ID');
  }
  
  const objectId = new ObjectId(id); // Create a new ObjectId instance
  await recipesCollection.deleteOne({ _id: objectId });
}

module.exports = { getRecipes, addRecipe, getRecipeById, deleteRecipeById };
