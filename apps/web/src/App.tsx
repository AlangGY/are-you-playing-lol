import { useState } from "react";
import { checkCurrentGame, findSummonerUuid } from "./fetcher";
import "./global.css";

function App() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [puuid, setPuuid] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gameObject, setGameObject] = useState<Record<string, any>>({});

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const handleTagLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagLine(e.target.value);
  };

  const handlePuuidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPuuid(e.target.value);
  };

  const handleFindSummonerUuid = async () => {
    const response = await findSummonerUuid({
      queryParam: {
        gameName,
        tagLine,
      },
    });
    setPuuid(response.puuid);
  };

  const handleCheckCurrentGame = async () => {
    const response = await checkCurrentGame({
      queryParam: {
        puuid,
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
        <label>
          <span>puuid</span>
          <input type="text" value={puuid} onChange={handlePuuidChange} />
        </label>
        <button onClick={handleFindSummonerUuid}>Find Summoner UUID</button>
        <button onClick={handleCheckCurrentGame}>Check Current Game</button>
        <div>{JSON.stringify(gameObject)}</div>
      </div>
    </>
  );
}

export default App;
