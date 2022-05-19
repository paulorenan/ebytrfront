import React from 'react'
import Header from './Header';
import CardDiv from './CardDiv';
import { Box } from '@mui/material';

function MainPage() {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #a8ff78, #78ffd6)'
      }}
    >
      <Header />
      <CardDiv />
    </Box>
  )
}

export default MainPage;