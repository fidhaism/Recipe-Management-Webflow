import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';

function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
      setRecipe(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      {recipe ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {recipe.name}
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6}>
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: 'auto' }} />
              </Grid>
            </Grid>
            <Typography variant="body1">
              <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
            </Typography>
            <Typography variant="body1">
              <strong>Instructions:</strong> {recipe.instructions.join('. ')}
            </Typography>
            <Typography variant="body1">
              <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
            </Typography>
            <Typography variant="body1">
              <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
            </Typography>
            {/* Add more fields as needed */}
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          Recipe not found
        </Typography>
      )}
    </Container>
  );
}

export default ViewRecipe;
