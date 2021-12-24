import React from 'react'
const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc+part.exercises,0);
    return (
      <div className="total">
        <p>Number of exercises {total}</p>
      </div>
    );
  };

  export default Total;