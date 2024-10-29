import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <img src="../../../public/accets/GBIS.png" alt="Task Management" style={styles.image} /> <br />
      <h1 style={styles.title}>Welcome to GBIS Ticketing Portal</h1>
      <div style={styles.linksContainer}>
        <Link to="/employee/login" style={styles.link} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
          Login
        </Link>
      </div>
    </div>
  );
};

const handleHover = (e) => {
  e.target.style.backgroundColor = '#007BFF';
  e.target.style.color = '#fff';
  e.target.style.transform = 'translateY(-3px)';
};

const handleHoverOut = (e) => {
  e.target.style.backgroundColor = '#fff';
  e.target.style.color = '#007BFF';
  e.target.style.transform = 'translateY(0)';
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #E0F7FA, #87CEFA, #F0FFFF)', // Light blue, sky blue, and white gradient
    fontFamily: "'Poppins', sans-serif",
  },
  image: {
    width: '400px',
    height: 'auto',
    marginBottom: '30px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    marginBottom: '40px',
    textAlign: 'center',
  },
  
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    padding: '15px 80px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '30px',
    fontSize: '1.2rem',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    fontWeight: '700',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.3s ease',
  },
};

export default Home;
