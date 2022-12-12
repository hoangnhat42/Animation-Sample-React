import "./styles.css";
import { useEffect, useRef } from "react";

const getPixelRatio = (context) => {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

const Dot = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // select the canvas element
    const canvas = canvasRef.current;
    // create a 2D contest
    const ctx = canvas.getContext("2d");

    let ratio = getPixelRatio(ctx);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // const render = () => {
    //   ctx.beginPath();
    //   ctx.arc(
    //     canvas.width / 10,
    //     canvas.height / 2,
    //     canvas.width / 15,
    //     0,
    //     2 * Math.PI
    //   );
    //   ctx.fillStyle = "black";
    //   ctx.fill();
    // };
    //requestAnimationFrame(render);

    //render 50 dots
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 10,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "black";
        ctx.fill();
        }

    // onHover effect for dots move 5px in any direction on mouse hover
        canvas.addEventListener("mousemove", (e) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 10,
                    0,
                    2 * Math.PI
                );
                ctx.fillStyle = "black";
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(
                e.offsetX,
                e.offsetY,
                10,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "black";
            ctx.fill();
        });
    }, []);

    
  return <canvas ref={canvasRef} width={400} height={500}> </canvas>;
};

export default Dot;

// useEffect(() => {
//   window.addEventListener("resize", () => {
//     canvasRef.current.style.width = window.innerWidth;
//     canvasRef.current.style.height = window.innerHeight;
//   });
// });

// console.log("H", height);
//     console.log("W", width);
//     console.log("R", ratio);
