import { generateFetcher } from "./utils/api-fetcher/generateFetcher";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const findSummonerUuid = generateFetcher<
  void,
  {
    gameName: string;
    tagLine: string;
  },
  void,
  {
    puuid: string;
  }
>({
  base: API_BASE_URL,
  endpoint: "/summoner",
  method: "GET",
  requestContentType: "json",
  responseContentType: "json",
});

export const checkCurrentGame = generateFetcher<
  void,
  {
    puuid: string;
  },
  void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>
>({
  base: API_BASE_URL,
  endpoint: "/current-game",
  method: "GET",
  requestContentType: "json",
  responseContentType: "json",
});
