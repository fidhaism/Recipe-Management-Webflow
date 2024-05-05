import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

function AddRecipe() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cookTimeMinutes: '',
    cuisine: '',
    image: '',
  });

  const [error, setError] = useState('');

  const handleFormDataChange = (field, value) => {
    setRecipeData({...recipeData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', recipeData);
      console.log(response.data);
      setRecipeData({ 
        name: '', 
        ingredients: '', 
        instructions: '', 
        cookTimeMinutes: '', 
        cuisine: '', 
        image: '' 
      });
      setError(''); // Reset error message on successful submission
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Add New Recipe</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Recipe Name"
              value={recipeData.name}
              onChange={(e) => handleFormDataChange('name', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ingredients"
              value={recipeData.ingredients}
              onChange={(e) => handleFormDataChange('ingredients', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Instructions"
              value={recipeData.instructions}
              onChange={(e) => handleFormDataChange('instructions', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cook Time (minutes)"
              type="number"
              value={recipeData.cookTimeMinutes}
              onChange={(e) => handleFormDataChange('cookTimeMinutes', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cuisine"
              value={recipeData.cuisine}
              onChange={(e) => handleFormDataChange('cuisine', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              value={recipeData.image}
              onChange={(e) => handleFormDataChange('image', e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        {error && <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Recipe
        </Button>
      </form>
    </Container>
  );
}

export default AddRecipe;
