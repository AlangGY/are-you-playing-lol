import { Model } from "@are-you-playing-lol/common-interfaces";

interface PlayerProps {
  summoner: Model.Summoner;
}

export function Player({ summoner }: PlayerProps) {
  const name = summoner.riotId.split("#")[0];
  const tag = summoner.riotId.split("#")[1];

  return (
    <div className="grid grid-cols-[40px_200px_150px_120px_auto] items-center py-2 hover:bg-[#2a2a2a]">
      <img
        src={summoner.champion.image.square}
        alt="champion"
        className="w-8 h-8 rounded-full"
      />

      <div className="flex items-center gap-2">
        <img
          src={`/images/perk/${summoner.perks.perkStyle}.png`}
          alt="perk"
          className="w-4 h-4"
        />
        <img
          src={`/images/perk/${summoner.perks.perkSubStyle}.png`}
          alt="perk"
          className="w-4 h-4"
        />
      </div>

      <div className="flex items-center gap-1 text-nowrap">
        <span className="text-white font-medium">{name}</span>
        <span className="text-[#999] text-sm">#{tag}</span>
      </div>
    </div>
  );
}
