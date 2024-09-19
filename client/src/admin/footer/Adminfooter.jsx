import React from 'react';
import './Footer.css'; // You can style it as per your needs

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-1 mt-auto">
      <div className="container-fluid"> {/* Changed from container to container-fluid */}
        <div className="row d-flex justify-content-between align-items-center">
          {/* Left Section */}
          <div className="col-md-3 text-center">
            <p>© {new Date().getFullYear()} GBIS. All rights reserved.</p>
          </div>

          {/* Middle Section - Social Links */}
          <div className="col-md-6 text-center">
            <a href="https://www.facebook.com" className="text-white me-3">
              <i className="fa fa-facebook fa-lg"></i>
            </a>
            <a href="https://www.twitter.com" className="text-white me-3">
              <i className="fa fa-twitter fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com" className="text-white me-3">
              <i className="fa fa-linkedin fa-lg"></i>
            </a>
            <a href="https://www.instagram.com" className="text-white me-3">
              <i className="fa fa-instagram fa-lg"></i>
            </a>
          </div>

          {/* Right Section - Company Link */}
          <div className="col-md-3 text-center">
            <a href="https://gbisinc.com" className="text-white">
              Global Business Infotech Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
