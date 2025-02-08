import { useState } from "react";
import { Model } from "@are-you-playing-lol/common-interfaces";
import { checkCurrentGame } from "./fetcher";
import "./global.css";

function App() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [gameInfo, setGameInfo] = useState<Model.GameInfo | null>(null);

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const handleTagLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagLine(e.target.value);
  };

  const handleCheckCurrentGame = async () => {
    const response = await checkCurrentGame({
      queryParam: {
        gameName,
        tagLine,
      },
    });
    setGameInfo(response);
  };

  return (
    <>
      <div className="w-lvw flex flex-col items-center justify-center gap-4">
        <label>
          <span>gameName</span>
          <input type="text" value={gameName} onChange={handleGameNameChange} />
        </label>
        <label>
          <span>tagLine</span>
          <input type="text" value={tagLine} onChange={handleTagLineChange} />
        </label>

        <button onClick={handleCheckCurrentGame}>Check Current Game</button>
        <div>{JSON.stringify(gameInfo)}</div>
      </div>
    </>
  );
}

export default App;
