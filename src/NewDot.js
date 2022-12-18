import React from 'react';

export default function CanvasDots () {
  const [dots, setDots] = React.useState([
    { x: 100, y: 100, radius: 10, originalX: 100, originalY: 100 },
    { x: 200, y: 200, radius: 15, originalX: 200, originalY: 200 }
  ]);

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set the dimensions of the canvas
    const width = canvas.width;
    const height = canvas.height;

    // Animate the dots' movement
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the dots
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();
  }, [dots]);

  const handleMouseOver = index => {
    // Update the position of the dot at the given index
    setDots(prevDots => {
      const newDots = [...prevDots];
      newDots[index].x += 10;
      newDots[index].y += 10;
      return newDots;
    });
  };

  const handleMouseOut = index => {
    // Restore the original position of the dot at the given index
    setDots(prevDots => {
      const newDots = [...prevDots];
      newDots[index].x = newDots[index].originalX;
      newDots[index].y = newDots[index].originalY;
      return newDots;
    });
  };

  return (
    <div>
      {dots.map((dot, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: dot.x - dot.radius,
            top: dot.y - dot.radius,
            width: dot.radius * 2,
            height: dot.radius * 2,
            borderRadius: '50%',
            backgroundColor: 'red',
            zIndex: 1
          }}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={() => handleMouseOut(index)}
        />
      ))}
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

