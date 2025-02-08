import { generateFetcher } from "./utils/api-fetcher/generateFetcher";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const checkCurrentGame = generateFetcher<
  void,
  {
    gameName: string;
    tagLine: string;
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
