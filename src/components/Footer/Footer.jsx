import React from 'react';
import './Footer.styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <a
            href="https://armanghazi.github.io/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="footer-icon">🌐</span>
            <span>Website</span>
          </a>
        </div>

        <div className="footer-section">
          <ul className="footer-links">
            <li>
              <a
                href="https://www.linkedin.com/in/arman-ghaziaskari/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <span className="footer-icon">💼</span>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/armanghazi/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <span className="footer-icon">💻</span>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.kaggle.com/armanghazi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <span className="footer-icon">📊</span>
                <span>Kaggle</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <p className="copyright">
            ©{new Date().getFullYear()} Arman Ghaziaskari Naeini
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
