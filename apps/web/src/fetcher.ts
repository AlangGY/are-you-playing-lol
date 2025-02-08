import { Dto } from "@are-you-playing-lol/common-interfaces";
import { generateFetcher } from "./utils/api-fetcher/generateFetcher";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const checkCurrentGame = generateFetcher<
  void,
  {
    gameName: string;
    tagLine: string;
  },
  void,
  Dto.GetCurrentGameResponseDto
>({
  base: API_BASE_URL,
  endpoint: "/current-game",
  method: "GET",
  requestContentType: "json",
  responseContentType: "json",
});
