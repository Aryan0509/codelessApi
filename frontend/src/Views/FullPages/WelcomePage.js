import React from 'react';
import './WelcomePage.css';

function WelcomePage({ showWelcomeButton, closeWelcomePage }) {
  const handleShowWelcome = () => {
    showWelcomeButton();
  };

  const handleCloseWelcome = () => {
    closeWelcomePage();
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to our Automated API Testing Software!</h1>
      {/* Rest of the content */}
      <button className="close-button" onClick={handleCloseWelcome}>Close Welcome</button>
    </div>
  );
}

export default WelcomePage;
