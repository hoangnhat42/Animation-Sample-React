import React from "react";
import "./styles.css";
import ParticleImage, { forces, Vector } from "react-particle-image";
const src = "https://i.imgur.com/lMAkojn.png";

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: "#000" }}>
      <ParticleImage
        scale={0.6}
        maxParticles={5000}
        backgroundColor="#000"
        src={src}
        mouseMoveForce={(x, y) => forces.disturbance(x, y, 6)}
        touchMoveForce={(x, y) => forces.disturbance(x, y, 6)}
        mouseDownForce={(x, y) => forces.disturbance(x, y, 50)}
        particleOptions={{
          mass: () => 40,
          filter: ({ x, y, image }) => {
            const pixel = image.get(x, y);
            return pixel.r === 255;
          },
          color: () => "#f4afe0",
          friction: () => 0.15,
          initialPosition: ({ canvasDimensions }) => {
            return new Vector(
              canvasDimensions.width / 9,
              canvasDimensions.height / 2
            );
          }
        }}
      />
      
      <div style={{ backgroundColor: "#000" }}>
      </div>
    </div>
  );
}
