import React from 'react';
import './Footer.css'; // Assuming you are adding the CSS in a separate file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Sections */}
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Press Releases</a></li>
            <li><a href="/">Amazon Cares</a></li>
            <li><a href="/">Gift a Smile</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="/">Sell on Amazon</a></li>
            <li><a href="/">Amazon Global Selling</a></li>
            <li><a href="/">Become an Affiliate</a></li>
            <li><a href="/">Advertise Your Products</a></li>
            <li><a href="/">Amazon Pay</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Amazon Payment Products</h3>
          <ul>
            <li><a href="/">Amazon Business Card</a></li>
            <li><a href="/">Shop with Points</a></li>
            <li><a href="/">Reload Your Balance</a></li>
            <li><a href="/">Amazon Currency Converter</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="/">Your Account</a></li>
            <li><a href="/">Returns Centre</a></li>
            <li><a href="/">100% Purchase Protection</a></li>
            <li><a href="/">Amazon App Download</a></li>
            <li><a href="/">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="footer-social">
        <a href="/" className="social-icon">Facebook</a>
        <a href="/" className="social-icon">Twitter</a>
        <a href="/" className="social-icon">Instagram</a>
        <a href="/" className="social-icon">YouTube</a>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; 2024 Amazon Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
