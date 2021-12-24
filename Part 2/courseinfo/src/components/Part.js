import React from 'react';
const Part = ({ part }) => {
    return (
      <div className="part">
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };

export default Part 