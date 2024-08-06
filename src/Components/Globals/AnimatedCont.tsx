import { Badge } from "primereact/badge";
import React, { useState, useEffect } from "react";

interface AnimatedCounterProps {
  targetNumber: number;
  duration?: number; // duración en milisegundos, opcional
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetNumber,
  duration = 2000,
  className,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (targetNumber <= 0) return;

    const increment = targetNumber / (duration / 100);
    let currentCount = 0;

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetNumber) {
        clearInterval(interval);
        setCount(targetNumber);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return <Badge value={count} className={className} />;
};

export default AnimatedCounter;
