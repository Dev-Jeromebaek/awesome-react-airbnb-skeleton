import React from 'react';

import Test from './Test';
import '../assets/css/style.css';
import image from '../assets/images/image.jpg';

function App() {
  const title = 'Hello React Airbnb Skeleton';
  return (
    <div className="main">
      <h1 className="hello">{title}</h1>
      <img src={image} alt="main" />
      <Test />
    </div>
  );
}

export default App;
