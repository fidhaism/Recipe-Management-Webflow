import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response1 = await axios.get('https://dummyjson.com/recipes');
      const response2 = await axios.get('http://localhost:5000/api/recipes');

      if (Array.isArray(response1.data.recipes) && Array.isArray(response2.data)) {
        const mergedRecipes = [...response1.data.recipes, ...response2.data];
        setRecipes(mergedRecipes);
        setFilteredRecipes(mergedRecipes);
      } else {
        console.error('Response data is not an array:', response1.data, response2.data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-recipes/${recipeId}`);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId && recipe.id !== recipeId));
      setFilteredRecipes(filteredRecipes.filter((recipe) => recipe._id !== recipeId && recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setErrorMessage('Error deleting recipe');
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <TextField
        label="Search Recipes"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card onClick={() => handleOpenModal(recipe)} style={{ cursor: 'pointer', height: '100%' }}>
              <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '10px' }}>
                  {recipe.name}
                </Typography>
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                <Button onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRecipe(recipe._id);
                }} color="secondary" variant="outlined" style={{ alignSelf: 'flex-end' }}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedRecipe && selectedRecipe.name}</DialogTitle>
        <DialogContent>
          <img src={selectedRecipe && selectedRecipe.image} alt={selectedRecipe && selectedRecipe.name} style={{ width: '100%', height: 'auto' }} />
          <Typography variant="h6">Ingredients:</Typography>
          <List>
            {selectedRecipe && Array.isArray(selectedRecipe.ingredients) && selectedRecipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText>{ingredient}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Instructions:</Typography>
          <List>
            {selectedRecipe && Array.isArray(selectedRecipe.instructions) && selectedRecipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText>{instruction}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="body1"><strong>Prep Time:</strong> {selectedRecipe && selectedRecipe.prepTimeMinutes} minutes</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </Container>
  );
}

export default Home;
