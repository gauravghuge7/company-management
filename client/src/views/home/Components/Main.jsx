// Main.js
import React from 'react';

const Main = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Welcome to Our Website!</h1>
        <p style={styles.text}>
          Discover the latest insights and information about our company. We’re committed to providing top-notch services and building lasting relationships with our customers.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh', // Full viewport height
    backgroundImage: 'url("https://via.placeholder.com/1920x1080")', // Background image URL
    backgroundSize: 'cover', // Ensures the image covers the whole screen
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', // Text color for better contrast
    overflow: 'hidden', // Prevents overflow for smaller screens
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for text visibility
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    maxWidth: '80%',
    margin: '0 auto',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    letterSpacing: '2px',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
    letterSpacing: '1px',
  },
};

export default Main;
