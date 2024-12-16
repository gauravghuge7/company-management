// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img
          src="../../../accets/GBIS.png" // Update this path if necessary
          alt="Logo"
          style={styles.logo}
        />
      </div>
      
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for subtle separation
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '150px', // Adjust size as needed
    height: 'auto',
  },
  middleSection: {
    display: 'flex',
    gap: '20px', // Add space between the icons
    alignItems: 'center',
  },
  iconLink: {
    color: '#333',
    fontSize: '1.3rem', // Size of the icons, adjust as needed
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
