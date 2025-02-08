import { Model } from "@are-you-playing-lol/common-interfaces";
import { Player } from "./Player";
import { MatchInfo } from "./MatchInfo";
import { TeamTable } from "./TeamTable";

interface GameBoardProps {
  gameInfo: Model.GameInfo;
}

export function GameBoard({ gameInfo }: GameBoardProps) {
  const { teamBlue, teamRed, gameLength, gameType } = gameInfo;

  return (
    <div className="w-full bg-[#1a1a1a] text-white rounded-lg p-4">
      <MatchInfo gameType={gameType} initialGameLength={gameLength} />

      <TeamTable teamName="블루" colorVariant="blue">
        {teamBlue.map((summoner) => (
          <Player key={summoner.summonerId} summoner={summoner} />
        ))}
      </TeamTable>

      <TeamTable teamName="레드" colorVariant="red">
        {teamRed.map((summoner) => (
          <Player key={summoner.summonerId} summoner={summoner} />
        ))}
      </TeamTable>
    </div>
  );
}
