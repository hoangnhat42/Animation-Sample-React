import React, { useRef, useEffect, useState } from 'react';

export default function ParticleCanvas() {
  // Khởi tạo một tham chiếu để lưu trữ canvas
  const canvasRef = useRef(null);

  // Khởi tạo trạng thái di chuột có đang nằm trên canvas hay không
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Hàm này sẽ được gọi khi component được mount và khi có thay đổi trong props hoặc state
  useEffect(() => {
    // Lấy ra canvas và context
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Tạo ra những điểm ngẫu nhiên trên canvas
    const points = [];
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      points.push({ x, y, vx: 0, vy: 0 });
    }

    // Vẽ điểm lên canvas
    function drawPoints() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.fill();
      });
    }

    // Gọi hàm vẽ điểm lên canvas
    drawPoints();

    // Thiết lập hiệu ứng khi di chuột vào điểm
    function updatePoints(x, y) {
      points.forEach((point, index) => {
        const dx = x - point.x;
        const dy = y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          point.vx += Math.cos(angle) * force;
          point.vy += Math.sin(angle) * force;
        }
        point.x += point.vx;
        point.y += point.vy;
        point.vx *= 0.9;
        point.vy *= 0.9;  
      });
    }

    // Hàm này sẽ được gọi khi di chuột vào canvas
    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      updatePoints(x, y);
      drawPoints();
    }

    // Hàm này sẽ được gọi khi di chuột ra khỏi canvas
    function onMouseLeave() {
      setIsMouseOver(false);
    }

    // Hàm này sẽ được gọi khi di chuột vào canvas

    function onMouseEnter() {
      setIsMouseOver(true);
    }

    // Thêm sự kiện di chuột vào canvas
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mouseenter', onMouseEnter);

    // Hàm này sẽ được gọi khi component được unmount
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mouseenter', onMouseEnter);
    }
  }, [isMouseOver]);

  return (
    <canvas

      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

