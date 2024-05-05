import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddRecipe from './Pages/AddRecipe';
import ViewRecipe from './Pages/ViewRecipe';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home'; // Assuming Home.jsx is located in the same directory

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/view/:id" element={<ViewRecipe />} />
        
        <Route path="/" element={<Home />} /> {/* Render Home component when root path is accessed */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to Home if path not found */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
