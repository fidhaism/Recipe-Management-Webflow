// index.js server-side
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const { getRecipes, addRecipe, getRecipeById, deleteRecipeById } = require('./db');
const { ObjectId } = require('mongodb');

// Middleware
app.use(express.json());
app.use(cors());

// Debugging Middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url, req.params, req.query, req.body);
  next();
});


// API Endpoints
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = req.body;
    await addRecipe(recipe);
    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await getRecipes();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await getRecipeById(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/delete-recipes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteRecipeById(id, ObjectId); // Pass ObjectId here
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Recipe Management Webpage Server listening on port ${PORT}`);
});
