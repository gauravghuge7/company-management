

// import { Link } from 'react-router-dom';

// const Home = () => {

  

//   return (

//     <div style={styles.container}>
//       <h1>Welcome to GBIS Taskmangment Portal</h1>
//       <div style={styles.linksContainer}>

//         <Link to="/client/login" style={styles.link}>
//           Client Login
//         </Link>
//         <Link to="/employee/login" style={styles.link}>
//           Employee Login
//         </Link>
//         <Link to="/admin/login" style={styles.link}>
//           Admin Login
//         </Link>


       

//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',

//   },
//   linksContainer: {
//     marginTop: '20px',

//   },
//   link: {
//     padding: '10px 20px',
   
//   },
// };

// export default Home;


import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <img src="../../../public/accets/GBIS.png" alt="Task Management" style={styles.image} /> <br />
      <h1 style={styles.title}  >Welcome to GBIS Ticketing Portal</h1>
      <div style={styles.linksContainer}>
      {/* <Link to="/admin/login" style={styles.link} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
          Admin Login
        </Link> */}
       
        <Link to="/employee/login" style={styles.link} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
          Login
        </Link>
        {/* <Link to="/client/login" style={styles.link} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
          Client Login
        </Link> */}
      
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
    background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)', // Gradient background
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Soft shadow for text
    marginBottom: '40px',
    textAlign: 'center',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between buttons
  },
  link: {
    textDecoration: 'none',
    padding: '15px 30px',
    backgroundColor: '#fff',
    color: '#007BFF',
    borderRadius: '30px',
    fontSize: '1.2rem',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
};

export default Home;
