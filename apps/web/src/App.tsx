import { useState } from "react";
import { checkCurrentGame } from "./fetcher";
import "./global.css";

function App() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gameObject, setGameObject] = useState<Record<string, any>>({});

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
    setGameObject(response);
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
        <div>{JSON.stringify(gameObject)}</div>
      </div>
    </>
  );
}

export default App;
