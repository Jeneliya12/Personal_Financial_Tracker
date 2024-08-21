// src/components/SimulatedErrorComponent.js
import React from "react";

const SimulatedErrorComponent = () => {
  // Simulate an error
  throw new Error("Simulated error in SimulatedErrorComponent");

  return <div>Simulated Error Component</div>;
};

export default SimulatedErrorComponent;
