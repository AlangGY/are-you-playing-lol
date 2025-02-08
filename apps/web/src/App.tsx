import { useState } from "react";
import { Model } from "@are-you-playing-lol/common-interfaces";
import { checkCurrentGame } from "./fetcher";
import { GameBoard } from "./components/GameBoard";
import "./global.css";

function App() {
  const [gameInfo, setGameInfo] = useState<Model.GameInfo | null>(null);

  const handleCheckCurrentGame = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const gameName = formData.get("gameName") as string | null;
      const tagLine = formData.get("tagLine") as string | null;

      if (!gameName || !tagLine) {
        alert("소환사 이름과 태그를 입력해주세요.");
        return;
      }

      const response = await checkCurrentGame({
        queryParam: {
          gameName,
          tagLine,
        },
      });

      setGameInfo(response);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return;
      }
      throw error;
    }
  };

  return (
    <>
      <div className="w-lvw flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleCheckCurrentGame} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span>소환사 이름</span>
            <input
              name="gameName"
              type="text"
              className="bg-amber-50 text-black"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>태그</span>
            <input
              name="tagLine"
              type="text"
              className="bg-amber-50 text-black"
            />
          </label>

          <button
            type="submit"
            className="bg-amber-500 text-white p-2 rounded-md"
          >
            검색
          </button>
        </form>
        <div className="w-full bg-[#1a1a1a] text-white rounded-lg">
          {gameInfo && <GameBoard gameInfo={gameInfo} />}
        </div>
      </div>
    </>
  );
}

export default App;
