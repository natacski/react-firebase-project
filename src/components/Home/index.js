import React from 'react';

import { withAuthorization } from '../Session';


const HomePage = () => (
  <div className="banner">
    <h1>City Weather Home </h1>
    <p>This is a simple weather app. Enter the zip code of any city and will get all the information about that city's weather</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);


