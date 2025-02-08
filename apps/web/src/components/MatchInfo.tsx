import { useState, useEffect } from "react";

interface MatchInfoProps {
  gameType: string;
  initialGameLength: number;
}

export function MatchInfo({ gameType, initialGameLength }: MatchInfoProps) {
  const [currentGameLength, setCurrentGameLength] = useState(initialGameLength);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGameLength((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatGameTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-between py-3 border-b border-[#333]">
      <div>{gameType}</div>
      <div>{formatGameTime(currentGameLength)}</div>
    </div>
  );
}
