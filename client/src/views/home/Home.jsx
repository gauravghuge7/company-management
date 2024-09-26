import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Importing Bootstrap components

const Home = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-dark text-white"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/564x/19/11/28/191128d4a7739dd00b4dac0ad4051025.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="mb-4"> {/* Adjust margin-bottom for spacing */}
        <img 
          src="../../../public/accets/GBIS.png" 
          alt="Task Management"
          style={{
            height: '150px', // Set a height for the image
            width: 'auto', // Maintain aspect ratio
            maxWidth: '100%', // Ensure it doesn't overflow
            marginTop: '-60px', // Pull the image upwards
          }} 
        />
      </div>
      <h1 
        className="display-4 mb-4 text-center"
        style={{
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 'bold',
          color: '#0096FF',
          fontSize: 'calc(1.5rem + 2vw)' // Responsive font size
        }}
      >
        Welcome to GBIS Ticketing Portal
      </h1>

      <div className="row w-100 d-flex justify-content-center align-items-center gap-3">
        {/* Buttons for Login with hover effects */}
        <div className="col-12 col-md-3 text-center">
          <Button 
            as={Link} 
            to="/admin/login" 
            className="custom-button w-100"
            style={hoveredButton === 'admin' ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton('admin')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Admin Login
          </Button>
        </div>
        <div className="col-12 col-md-3 text-center">
          <Button 
            as={Link} 
            to="/employee/login" 
            className="custom-button w-100"
            style={hoveredButton === 'employee' ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton('employee')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Employee Login
          </Button>
        </div>
        <div className="col-12 col-md-3 text-center">
          <Button 
            as={Link} 
            to="/client/login" 
            className="custom-button w-100"
            style={hoveredButton === 'client' ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHoveredButton('client')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Client Login
          </Button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for button default and hover effects
const buttonStyle = {
  backgroundColor: '#f0f8ff', // Light blue background
  border: '1px solid #87cefa', // Light border
  color: '#333', // Dark text color for contrast
  transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
  padding: '10px 20px',
  fontSize: '1.2rem', // Smaller font size for buttons
  borderRadius: '10px',
  fontFamily: '"Poppins", sans-serif', 
  fontWeight: 'bold',
};

const buttonHoverStyle = {
  backgroundColor: '#87cefa', // Lighter blue on hover
  borderColor: '#00bfff', // Brighter blue border on hover
  color: '#333', // Keep text color on hover
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 'bold',
};

// Export the Home component
export default Home;