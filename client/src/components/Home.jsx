import React from 'react';

const Home = () => {
  return (

    <div style={homeContainer}>
      <h1 style={headingStyle}>Welcome to Blackcoffer</h1>
    </div>
  );
}

const homeContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px)', 
};

const headingStyle = {
  textAlign: 'center',
  fontSize: '3rem',
  color: 'darkblue',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
};

export default Home;
