import React from 'react';
import SignInPage from '../SignIn';

const Landing = () => (
  <div className="landingPage">
    <h1>The Weather App</h1>
    <p className="mainStyle">
      Be prepared with the most accurate forecast for any city using
      the zip code!
    </p>
    <SignInPage />
  </div>
);

export default Landing;
