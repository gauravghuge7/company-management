import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.row}>
          {/* Left Section */}
          <div style={styles.leftSection}>
            <p style={styles.text}>© {new Date().getFullYear()} GBIS. All rights reserved.</p>
          </div>

          {/* Right Section - Company Link */}
          <div style={styles.rightSection}>
            <a href="https://gbisinc.com" style={styles.companyLink}>
              Global Business Infotech Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    padding: '10px 0',
    color: '#fff',
    background: '#333', // Change this to your preferred background color
    position: 'relative', // Position is now relative for Flexbox support in App.js
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    textAlign: 'center',
  },
  rightSection: {
    flex: 1,
    textAlign: 'center',
  },
  companyLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  text: {
    margin: 0,
    fontSize: '1rem',
  },
};

export default Footer;
