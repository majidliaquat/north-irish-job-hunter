
import React, { useEffect, useState } from "react";

const BackgroundEffects: React.FC = () => {
  const [signalLines, setSignalLines] = useState<Array<{ id: string; top: string; delay: string; reverse: boolean }>>([]);

  useEffect(() => {
    // Create initial signal lines
    const initialLines = Array.from({ length: 8 }, (_, i) => ({
      id: `line-${i}`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      reverse: Math.random() > 0.5
    }));
    setSignalLines(initialLines);
    
    // Periodically update signal lines
    const interval = setInterval(() => {
      setSignalLines(prev => prev.map(line => ({
        ...line,
        top: `${Math.random() * 100}%`
      })));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="signal-effect">
      {signalLines.map(line => (
        <div
          key={line.id}
          className={`signal-line ${line.reverse ? 'animate-pulse-signal-reverse' : 'animate-pulse-signal'}`}
          style={{
            top: line.top,
            animationDelay: line.delay
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
