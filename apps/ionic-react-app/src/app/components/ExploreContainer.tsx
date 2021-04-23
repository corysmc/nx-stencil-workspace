import React from 'react';
import { MyComponent } from '@my-org/core-react';

import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <h1>Welcome to ionic-react-app!</h1>
      <strong>{name}</strong>
      <p>
        Explore{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
        <MyComponent first="Cory" middle="Steven" last="M" />
      </p>
    </div>
  );
};

export default ExploreContainer;
