import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-content glass">
                <p>&copy; {new Date().getFullYear()} Mohit Salvi. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
